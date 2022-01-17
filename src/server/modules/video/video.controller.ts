import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UploadedFile,
    UseFilters,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { VideoService } from "./video.service";
import { ThrottlerGuard } from "@nestjs/throttler";
import { Request } from "express";
import { FindOneVideoParams } from "../../common/validators/findOneVideoParams.validator";
import { VideoExistsGuard } from "../../common/guards/videoExists.guard";
import { UploadVideoDto } from "../../common/validators/uploadVideo";
import { VideoNotFoundException } from "../../common/exceptions/VideoNotFound.exception";
import { VideoTooLargeException } from "../../common/exceptions/VideoTooLargeException.exception";
import { VideoUnsupportedFormatException } from "../../common/exceptions/VideoUnsupportedFormatException.exception";

@Controller("/videos")
export class VideoController {
    public constructor(private readonly videoService: VideoService) {}

    @Post("/")
    @UseInterceptors(FileInterceptor("video"))
    @UseGuards(ThrottlerGuard)
    @UseFilters(VideoTooLargeException, VideoUnsupportedFormatException)
    public async upload(
        @UploadedFile() video: Express.Multer.File,
        @Body() videoDto: UploadVideoDto,
        @Req() req: Request
    ) {
        const id = await this.videoService.upload(
            video,
            videoDto,
            req.user?.id
        );
        await this.videoService.generateThumbnail(id, video);
        return { id };
    }

    @Get("/")
    public getPublic() {
        return this.videoService.getPublic();
    }

    @Get("/:id")
    @UseGuards(VideoExistsGuard)
    @UseFilters(VideoNotFoundException)
    public async getVideoById(@Param() params: FindOneVideoParams) {
        const video = await this.videoService.findByIdAndView(params.id);
        const videoUrl = await this.videoService.getFileUrl(video.id);
        const videoThumbnail = await this.videoService.getThumbnailUrl(
            video.id
        );
        return { video, videoUrl, videoThumbnail };
    }
}
