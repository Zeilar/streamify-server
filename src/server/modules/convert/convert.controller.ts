import {
    Controller,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ConvertService } from "./convert.service";
import { ThrottlerGuard } from "@nestjs/throttler";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { Request } from "express";

@Controller("/convert")
export class ConvertController {
    public constructor(private readonly convertService: ConvertService) {}

    @Post("/")
    @UseInterceptors(FileInterceptor("video"))
    // @UseGuards(AuthenticatedGuard, ThrottlerGuard)
    public async convert(
        @UploadedFile() video: Express.Multer.File,
        @Req() req: Request
    ) {
        return await this.convertService.convert();
        // return { id };
    }
}
