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
import { Request } from "express";
import { FindOneVideoParams } from "../../common/validators/findOneVideoParams.validator";
import { VideoExistsGuard } from "../../common/guards/videoExists.guard";

@Controller("/video")
export class VideoController {
    public constructor(private readonly videoService: VideoService) {}

    @Post("/")
    @UseInterceptors(FileInterceptor("video"))
    @UseGuards(AuthenticatedGuard, ThrottlerGuard)
    public async upload(
        @UploadedFile() video: Express.Multer.File,
        @Req() req: Request
    ) {
        const id = await this.videoService.upload(video, req.user.id);
        return { id };
    }

    @Get("/:id")
    @UseGuards(VideoExistsGuard)
    public async getVideoById(@Param() params: FindOneVideoParams) {
        const [video, videoUrl] = await Promise.all([
            this.videoService.findById(params.id),
            this.videoService.getFileUrl(params.id),
        ]);
        return { video, videoUrl };
    }

    @Get("/public")
    public async getPublic() {
        return await this.videoService.getPublic();
    }
}
