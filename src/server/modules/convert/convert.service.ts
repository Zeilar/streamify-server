import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { VideoConfig } from "../../@types/config";
import { StorageService } from "../storage/storage.service";

@Injectable()
export class ConvertService {
    public constructor(
        private readonly configService: ConfigService<VideoConfig>,
        private readonly storageService: StorageService
    ) {}

    public async convert() {
        //
    }
}
