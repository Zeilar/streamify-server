import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    PayloadTooLargeException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VideoConfig } from "../../@types/config";
import { FindOneId } from "../../@types/repository";
import { FirebaseService } from "../firebase/firebase.service";
import { UserService } from "../user/user.service";
import { Video, Visibility } from "./video.entity";

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
    public async generateId() {
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
        const userCount = await this.videoRepository.count({ where: { id } });
        return userCount > 0;
    }

    public async upload(videoFile: Express.Multer.File, userId: FindOneId) {
        const buffer = Buffer.from(videoFile.buffer);
        const arrayBuffer = Uint8Array.from(buffer).buffer;
        if (
            arrayBuffer.byteLength >
            this.configService.get<number>("maxFileSize")
        ) {
            throw new PayloadTooLargeException();
        }
        const videoId = await this.generateId();
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new InternalServerErrorException(
                "The user that uploaded this video could not be found."
            );
        }
        await this.firebaseService.uploadVideo(videoId, arrayBuffer);
        const video = this.videoRepository.create({
            id: videoId,
            title: "My video",
            visibility: Visibility.PUBLIC,
            user,
        });
        await this.create(video);
    }

    public async findById(id: FindOneId) {
        const video = await this.videoRepository.findOne(id);
        if (!video) {
            throw new NotFoundException();
        }
        return video;
    }

    public async create(video: any) {
        await this.videoRepository.insert(video);
    }
}
