import {
    Controller,
    Get,
    HttpCode,
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
import { Request } from "express";
import { FindOneVideoParams } from "../../common/validators/findOneVideoParams.validator";

@Controller("/video")
export class VideoController {
    public constructor(private readonly videoService: VideoService) {}

    @Post("/")
    @UseInterceptors(FileInterceptor("video"))
    @UseGuards(AuthenticatedGuard, ThrottlerGuard)
    @HttpCode(204)
    public async upload(
        @UploadedFile() video: Express.Multer.File,
        @Req() req: Request
    ) {
        await this.videoService.upload(video, req.user.id);
    }

    @Get("/:id")
    public async getVideoById(@Param() params: FindOneVideoParams) {
        return await this.videoService.findById(params.id);
    }
}
