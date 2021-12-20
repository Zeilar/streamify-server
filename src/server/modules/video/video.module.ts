import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import video from "../../config/video";
import { VideoService } from "./video.service";

@Module({
    imports: [
        // TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot({ load: [video] }),
    ],
    providers: [VideoService],
})
export class VideoModule {}
