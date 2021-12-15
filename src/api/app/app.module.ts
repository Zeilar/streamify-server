import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import env from "src/config/env";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [env],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
