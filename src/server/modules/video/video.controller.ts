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
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";

@Controller("/video")
export class VideoController {
    public constructor(private readonly videoService: VideoService) {}

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(AuthenticatedGuard, ThrottlerGuard)
    public async upload(@UploadedFile() video: Express.Multer.File) {
        await this.videoService.upload(video);
    }
}
