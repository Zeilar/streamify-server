import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ConvertService } from "./convert.service";
import { ThrottlerGuard } from "@nestjs/throttler";

@Controller("/convert")
export class ConvertController {
    public constructor(private readonly convertService: ConvertService) {}

    @Post("/")
    @UseInterceptors(FileInterceptor("video"))
    @UseGuards(ThrottlerGuard)
    public async convert(@UploadedFile() video: Express.Multer.File) {
        return await this.convertService.convert(video);
    }
}
