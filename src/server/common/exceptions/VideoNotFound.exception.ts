import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
    HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(NotFoundException)
export class VideoNotFoundException implements ExceptionFilter {
    public catch(exception: NotFoundException, host: ArgumentsHost) {
        console.log(exception);
        const res = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();
        res.status(status).json({
            statusCode: status,
            message: "Video not found.",
        });
    }
}
