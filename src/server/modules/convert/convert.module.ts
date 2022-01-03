import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import video from "../../config/video";
import { StorageModule } from "../storage/storage.module";
import { ConvertController } from "./convert.controller";
import { ConvertService } from "./convert.service";

@Module({
    imports: [
        StorageModule,
        ConfigModule.forRoot({ load: [video] }),
        ThrottlerModule.forRoot({
            ttl: 60 * 60,
            limit: 10,
        }),
    ],
    controllers: [ConvertController],
    providers: [ConvertService],
})
export class ConvertModule {}
