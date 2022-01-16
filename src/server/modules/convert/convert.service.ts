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
        const input = this.storageService.path(`/public/${fileName}`);
        const output = `${input}.mp4`;
        await execFileAsync(ffmpeg, ["-i", input, "-codec", "copy", output]);
        await this.storageService.delete(input);
        return fileName;
    }
}
