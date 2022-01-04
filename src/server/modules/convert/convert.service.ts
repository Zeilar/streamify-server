import { Injectable } from "@nestjs/common";
import { StorageService } from "../storage/storage.service";
import ffmpeg from "ffmpeg-static";
import { execFile } from "child_process";
import { readFile } from "fs/promises";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

@Injectable()
export class ConvertService {
    public constructor(private readonly storageService: StorageService) {}

    public async convert(videoFile: Express.Multer.File) {
        const stored = await this.storageService.storeMulterFile(videoFile);
        const converted = `${stored}.mp4`;
        await execFileAsync(ffmpeg, ["-i", stored, converted]);
        const data = await readFile(converted);
        await Promise.all([
            this.storageService.delete(stored),
            this.storageService.delete(converted),
        ]);
        return data;
    }
}
