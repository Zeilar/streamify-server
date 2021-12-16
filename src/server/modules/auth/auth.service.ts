import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { compareSync } from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(username: string, hashedPassword: string) {
        const user = await this.userService.findOne(username);
        if (!user) {
            throw new NotFoundException();
        }
        if (compareSync(user.password, hashedPassword)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
