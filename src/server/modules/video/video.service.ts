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
import { User } from "../user/user.entity";
import { UploadVideoDto } from "../../common/validators/uploadVideo";

@Injectable()
export class VideoService {
    public constructor(
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
        private readonly configService: ConfigService<VideoConfig>,
        private readonly userService: UserService,
        private readonly firebaseService: FirebaseService
    ) {}

    // To make sure the resulting id is always the same length
    public async generateId(): Promise<string> {
        const base58alphabet =
            "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        const id = Array(this.configService.get<number>("videoIdLength"))
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
            this.configService.get<number>("maxFileSize")
        ) {
            throw new PayloadTooLargeException();
        }
        const { mime } = await fromBuffer(arrayBuffer);
        if (mime !== "video/mp4") {
            throw new UnsupportedMediaTypeException();
        }
        const videoId = await this.generateId();
        let user: User;
        if (userId) {
            user = await this.userService.findById(userId);
            if (!user) {
                throw new InternalServerErrorException(
                    "The user that uploaded this video could not be found."
                );
            }
        }
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

    public async getFileUrl(id: string) {
        if (!(await this.exists(id))) {
            throw new NotFoundException();
        }
        return await this.firebaseService.getVideoFileUrl(id);
    }

    public async getPublic() {
        return await this.videoRepository.find({
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
