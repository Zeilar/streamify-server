import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { VideoService } from "./video.service";
import { ThrottlerGuard } from "@nestjs/throttler";

@Controller("/video")
export class VideoController {
    public constructor(private readonly videoService: VideoService) {}

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(ThrottlerGuard)
    public async upload(@UploadedFile() video: Express.Multer.File) {
        await this.videoService.upload(video);
    }
}
