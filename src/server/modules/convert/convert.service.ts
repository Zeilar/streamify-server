import { Injectable } from "@nestjs/common";
import { StorageService } from "../storage/storage.service";
import ffmpeg from "ffmpeg-static";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

@Injectable()
export class ConvertService {
    public constructor(private readonly storageService: StorageService) {}

    public async convert(videoFile: Express.Multer.File) {
        const fileName = await this.storageService.storeMulterFile(
            videoFile,
            "/public"
        );
        const stored = this.storageService.path(`/public/${fileName}`);
        const converted = `${stored}.mp4`;
        await execFileAsync(ffmpeg, [
            "-i",
            stored,
            "-codec",
            "copy",
            converted,
        ]);
        await this.storageService.delete(stored);
        return fileName;
    }
}
