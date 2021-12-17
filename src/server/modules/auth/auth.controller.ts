import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    ValidationPipe,
} from "@nestjs/common";
import { Request } from "express";
import { UserService } from "../user/user.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("/auth")
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Post("/register")
    public async register(@Body("email") email: any) {
        return this.userService.create({
            displayName: "Display name",
            email: "test",
            password: "password",
        });
    }

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    public login(@Req() req: Request) {
        return req.user;
    }
}
