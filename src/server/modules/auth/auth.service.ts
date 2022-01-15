import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { HashService } from "../hash/hash.service";

@Injectable()
export class AuthService {
    public constructor(
        private readonly userService: UserService,
        private readonly hashService: HashService
    ) {}

    public async validateUser(email: string, password: string) {
        const user = await this.userService.findOne("email", email);
        if (!user) {
            return null;
        }
        if (await this.hashService.check(password, user.password)) {
            const { password, ...rest } = user;
            return rest;
        }
        return null;
    }
}
