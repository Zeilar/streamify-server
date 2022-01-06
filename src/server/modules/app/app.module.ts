import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { getConnectionOptions } from "typeorm";
import { DateHelper } from "../../common/helpers/Date.helper";
import { AuthModule } from "../auth/auth.module";
import { ConvertModule } from "../convert/convert.module";
import { FirebaseModule } from "../firebase/firebase.module";
import { HashModule } from "../hash/hash.module";
import { StorageModule } from "../storage/storage.module";
import { UserModule } from "../user/user.module";
import { VideoModule } from "../video/video.module";
import { ViewModule } from "../view/view.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        HashModule,
        FirebaseModule,
        UserModule,
        AuthModule,
        VideoModule,
        ConvertModule,
        TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true,
                }),
        }),
        StorageModule,
        ViewModule,
    ],
    controllers: [AppController],
    providers: [AppService, DateHelper],
})
export class AppModule {}
