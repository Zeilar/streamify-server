import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { VideoConfig } from "../../@types/config";

@Injectable()
export class VideoService {
    public constructor(
        // @InjectRepository(User)
        // private readonly userRepository: Repository<User>,
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
}
