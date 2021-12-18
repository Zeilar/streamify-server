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
        const { body } = request;
        const { id } = request.params;
        if (!body.password || !body.passwordConfirmation || !id) {
            throw new BadRequestException();
        }
        const user = await this.userService.findOne("id", id);
        if (!user) {
            throw new NotFoundException();
        }
        if (!request.isAuthenticated()) {
            throw new UnauthorizedException();
        }
        if (user.id !== request.user.id) {
            throw new ForbiddenException();
        }
        return request;
    }
}
