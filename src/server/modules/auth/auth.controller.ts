import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    ValidationPipe,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { hashSync } from "bcrypt";
import { Request } from "express";
import { BcryptConfig } from "../../@types/config";
import { UserService } from "../user/user.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("/auth")
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService<BcryptConfig>
    ) {}

    @Post("/register")
    public async register(@Body("email") email: any) {
        const saltRounds = this.configService.get<number>("bcrypt_saltRounds");
        return this.userService.create({
            displayName: "Display name",
            email: "test",
            password: hashSync("password", saltRounds),
        });
    }

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    public login(@Req() req: Request) {
        return req.user;
    }
}
