import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
    public constructor(private readonly userService: UserService) {}

    public async validateUser(email: string, password: string) {
        const user = await this.userService.findOne("email", email);
        if (!user) {
            throw new NotFoundException();
        }
        if (await compare(password, user.password)) {
            const { password, ...rest } = user;
            return rest;
        }
        return null;
    }
}
