import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import video from "../../config/video";
import { FirebaseService } from "../firebase/firebase.service";
import { VideoController } from "./video.controller";
import { Video } from "./video.entity";
import { VideoService } from "./video.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Video]),
        ConfigModule.forRoot({ load: [video] }),
    ],
    controllers: [VideoController],
    providers: [VideoService, FirebaseService],
})
export class VideoModule {}
