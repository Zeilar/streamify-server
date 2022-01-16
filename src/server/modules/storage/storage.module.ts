import { ConsoleLogger, Module, OnModuleInit } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { StorageService } from "./storage.service";

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60 * 60,
            limit: 10,
        }),
    ],
    providers: [StorageService, ConsoleLogger],
    exports: [StorageService],
})
export class StorageModule implements OnModuleInit {
    public constructor(private readonly storageService: StorageService) {}

    public onModuleInit() {
        this.storageService.createStorageIfNotExists();
    }
}
