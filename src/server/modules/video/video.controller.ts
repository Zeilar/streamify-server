import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { VideoService } from "./video.service";

@Controller("/video")
export class VideoController {
    public constructor(private readonly videoService: VideoService) {}

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    public async upload(@UploadedFile() video: Express.Multer.File) {
        await this.videoService.upload(video);
    }
}
