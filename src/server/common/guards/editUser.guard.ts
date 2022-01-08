import {
    ExecutionContext,
    Injectable,
    CanActivate,
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
    ForbiddenException,
} from "@nestjs/common";
import { UserService } from "../../modules/user/user.service";

@Injectable()
export class EditUserGuard implements CanActivate {
    public constructor(private readonly userService: UserService) {}

    public async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = await this.userService.findById(request.params.id);
        if (!user || user.id !== request.user.id) {
            throw new ForbiddenException();
        }
        return request;
    }
}
