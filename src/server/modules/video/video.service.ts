import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    PayloadTooLargeException,
    UnsupportedMediaTypeException,
} from "@nestjs/common";
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

@Injectable()
export class VideoService {
    public constructor(
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
        private readonly configService: ConfigService<VideoConfig, true>,
        private readonly userService: UserService,
        private readonly firebaseService: FirebaseService
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
            throw new PayloadTooLargeException();
        }
        const result = await fromBuffer(arrayBuffer);
        if (result?.mime !== "video/mp4") {
            throw new UnsupportedMediaTypeException();
        }
        const videoId = await this.generateId();
        if (userId && !this.userService.exists(userId)) {
            throw new InternalServerErrorException(
                "The user that uploaded this video could not be found."
            );
        }
        const user = await this.userService.findById(userId);
        await this.firebaseService.uploadVideo(videoId, arrayBuffer);
        await this.videoRepository.insert({
            id: videoId,
            user,
            ...videoDto,
        });
        return videoId;
    }

    public findById(id: string) {
        return this.videoRepository.findOne(id);
    }

    public async getFileUrl(id: string) {
        if (!(await this.exists(id))) {
            throw new NotFoundException();
        }
        return this.firebaseService.getVideoFileUrl(id);
    }

    public getPublic() {
        return this.videoRepository.find({
            where: { visibility: Visibility.PUBLIC },
            take: 30,
            skip: 30,
        });
    }

    public async findByIdAndView(id: string): Promise<Video | null> {
        const video = await this.findById(id);
        if (!video) {
            return null;
        }
        const views = video.views + 1;
        await this.videoRepository.update(id, { views });
        return { ...video, views };
    }
}
