import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VideoConfig } from "../../@types/config";
import { FindOneId } from "../../@types/repository";
import { FirebaseService } from "../firebase/firebase.service";
import { UserService } from "../user/user.service";
import { Video, Visibility } from "./video.entity";
import { fromBuffer } from "file-type";
import { UploadVideoDto } from "../../common/validators/uploadVideo";
import { VideoTooLargeException } from "../../common/exceptions/VideoTooLargeException.exception";
import { VideoUnsupportedFormatException } from "../../common/exceptions/VideoUnsupportedFormatException.exception";
import { StorageService } from "../storage/storage.service";
import { promisify } from "util";
import { execFile } from "child_process";
import ffmpeg from "ffmpeg-static";

const execFileAsync = promisify(execFile);

@Injectable()
export class VideoService {
    public constructor(
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
        private readonly configService: ConfigService<VideoConfig, true>,
        private readonly userService: UserService,
        private readonly firebaseService: FirebaseService,
        private readonly storageService: StorageService
    ) {}

    // To make sure the resulting id is always the same length
    public async generateId(): Promise<string> {
        const base58alphabet =
            "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        const id = Array(
            this.configService.get("videoIdLength", { infer: true })
        )
            .fill(null)
            .map(
                () =>
                    base58alphabet[
                        Math.floor(Math.random() * base58alphabet.length)
                    ]
            )
            .join("");
        const exists = await this.exists(id);
        return exists ? this.generateId() : id;
    }

    public async exists(id: string) {
        const videoCount = await this.videoRepository.count({ id });
        return videoCount > 0;
    }

    public async generateThumbnail(id: string, videoFile: Express.Multer.File) {
        const fileName = await this.storageService.storeMulterFile(
            videoFile,
            "/public"
        );
        const input = this.storageService.path(`/public/${fileName}`);
        const output = `${input}.jpg`;
        await execFileAsync(ffmpeg, [
            "-i",
            input,
            "-ss",
            "00:00:01.000",
            "-frames",
            "1",
            output,
        ]);
        const thumbnailBuffer = await this.storageService.getFileBuffer(output);
        this.storageService.delete(input, output);
        this.firebaseService.uploadThumbnail(id, thumbnailBuffer);
    }

    public async upload(
        videoFile: Express.Multer.File,
        videoDto: UploadVideoDto,
        userId?: FindOneId
    ) {
        const buffer = Buffer.from(videoFile.buffer);
        const arrayBuffer = Uint8Array.from(buffer).buffer;
        if (
            arrayBuffer.byteLength >
            this.configService.get("maxFileSize", { infer: true })
        ) {
            throw new VideoTooLargeException();
        }
        const result = await fromBuffer(arrayBuffer);
        if (result?.mime !== "video/mp4") {
            throw new VideoUnsupportedFormatException();
        }
        const videoId = await this.generateId();
        const user = await this.userService.findById(userId, true);
        await this.firebaseService.uploadVideo(videoId, arrayBuffer);
        await this.videoRepository.insert({
            id: videoId,
            user,
            ...videoDto,
        });
        return videoId;
    }

    public async findById(id: string) {
        const video = await this.videoRepository.findOne(id);
        if (!video) {
            throw new NotFoundException();
        }
        return video;
    }

    public getFileUrl(id: string) {
        return this.firebaseService.getVideoFileUrl(id);
    }

    public getThumbnailUrl(id: string) {
        return this.firebaseService.getThumbnailUrl(id);
    }

    public getPublic() {
        return this.videoRepository.find({
            where: { visibility: Visibility.PUBLIC },
            take: 30,
            skip: 30,
        });
    }

    public async findByIdAndView(id: string): Promise<Video> {
        const video = await this.findById(id);
        const views = video.views + 1;
        await this.videoRepository.update(id, { views });
        return { ...video, views };
    }
}
