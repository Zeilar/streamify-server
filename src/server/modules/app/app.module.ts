import { Module } from "@nestjs/common";
import { ViewModule } from "../view/view.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [ViewModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
