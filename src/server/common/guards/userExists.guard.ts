import {
    ExecutionContext,
    Injectable,
    CanActivate,
    NotFoundException,
} from "@nestjs/common";
import { UserService } from "../../modules/user/user.service";

@Injectable()
export class UserExistsGuard implements CanActivate {
    public constructor(private readonly userService: UserService) {}

    public async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { id } = request.params;
        const user = await this.userService.findById(id);
        if (!user) {
            throw new NotFoundException();
        }
        return request;
    }
}
