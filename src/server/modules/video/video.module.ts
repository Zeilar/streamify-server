import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerModule } from "@nestjs/throttler";
import video from "../../config/video";
import { VideoController } from "./video.controller";
import { Video } from "./video.entity";
import { VideoService } from "./video.service";
import { UserModule } from "../user/user.module";
import { FirebaseModule } from "../firebase/firebase.module";
import { StorageModule } from "../storage/storage.module";

@Module({
    imports: [
        FirebaseModule,
        UserModule,
        StorageModule,
        TypeOrmModule.forFeature([Video]),
        ConfigModule.forRoot({ load: [video] }),
        ThrottlerModule.forRoot({
            ttl: 60 * 60,
            limit: 10,
        }),
    ],
    controllers: [VideoController],
    providers: [VideoService],
})
export class VideoModule {}
