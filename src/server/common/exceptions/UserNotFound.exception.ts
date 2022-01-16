import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(NotFoundException)
export class UserNotFoundException implements ExceptionFilter {
    public catch(exception: NotFoundException, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();
        res.status(status).json({
            statusCode: status,
            message: "User not found.",
        });
    }
}
