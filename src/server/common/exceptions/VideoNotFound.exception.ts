import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class VideoNotFoundException implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();
        res.status(status).json({
            statusCode: status,
            message: "Video not found.",
        });
    }
}
