import {
    Controller,
    Get,
    Param,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { VideoService } from "./video.service";
import { ThrottlerGuard } from "@nestjs/throttler";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { FindOneParams } from "../../common/validators/findOneParams.validator";
import { Request } from "express";

@Controller("/video")
export class VideoController {
    public constructor(private readonly videoService: VideoService) {}

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(AuthenticatedGuard, ThrottlerGuard)
    public async upload(
        @UploadedFile() video: Express.Multer.File,
        @Req() req: Request
    ) {
        await this.videoService.upload(video, req.user.id);
    }

    @Get()
    public async getVideoById(@Param() params: FindOneParams) {
        // await
    }
}
