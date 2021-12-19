import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import env from "../../config/env";
import { ViewController } from "./view.controller";
import { ViewService } from "./view.service";

@Module({
    imports: [ConfigModule.forRoot({ load: [env] })],
    controllers: [ViewController],
    providers: [ViewService],
})
export class ViewModule {}
