import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    PayloadTooLargeException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(PayloadTooLargeException)
export class VideoTooLargeException implements ExceptionFilter {
    public catch(exception: PayloadTooLargeException, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();
        res.status(status).json({
            statusCode: status,
            message: "Video too large.",
        });
    }
}
