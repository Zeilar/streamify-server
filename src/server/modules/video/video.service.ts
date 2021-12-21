import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VideoConfig } from "../../@types/config";
import { Video } from "./video.entity";

@Injectable()
export class VideoService {
    public constructor(
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
        private readonly configService: ConfigService<VideoConfig>
    ) {}

    // To make sure the resulting id is always the same length
    public generateId() {
        const base58alphabet =
            "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        return Array(this.configService.get<number>("idLength"))
            .fill(null)
            .map(
                (_) =>
                    base58alphabet[
                        Math.floor(Math.random() * base58alphabet.length)
                    ]
            )
            .join("");
    }

    public async exists(id: string) {
        const userCount = await this.videoRepository.count({ where: { id } });
        return userCount > 0;
    }
}
