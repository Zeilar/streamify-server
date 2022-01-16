import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    ConflictException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(ConflictException)
export class EmailTakenException implements ExceptionFilter {
    public catch(exception: ConflictException, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();
        res.status(status).json({
            statusCode: status,
            message: "Email is taken.",
        });
    }
}
