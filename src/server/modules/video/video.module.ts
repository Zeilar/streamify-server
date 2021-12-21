import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import video from "../../config/video";
import { Video } from "./video.entity";
import { VideoService } from "./video.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Video]),
        ConfigModule.forRoot({ load: [video] }),
    ],
    providers: [VideoService],
})
export class VideoModule {}
