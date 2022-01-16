import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    UnsupportedMediaTypeException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(UnsupportedMediaTypeException)
export class VideoUnsupportedFormatException implements ExceptionFilter {
    public catch(
        exception: UnsupportedMediaTypeException,
        host: ArgumentsHost
    ) {
        const res = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();
        res.status(status).json({
            statusCode: status,
            message: "Video format is not supported.",
        });
    }
}
