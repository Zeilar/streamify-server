import { Module, OnModuleInit } from "@nestjs/common";
import { FirebaseService } from "./firebase.service";
import { ConfigModule } from "@nestjs/config";
import env from "../../config/env";

@Module({
    imports: [ConfigModule.forRoot({ load: [env] })],
    providers: [FirebaseService],
    exports: [FirebaseService],
})
export class FirebaseModule implements OnModuleInit {
    public constructor(private readonly firebaseService: FirebaseService) {}

    public onModuleInit() {
        this.firebaseService.init();
    }
}
