import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { UserService } from "../user/user.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("/auth")
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Post("/register")
    public async register() {
        return this.userService.create({
            displayName: "Display name",
            email: "test",
            password: "test",
        });
    }

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    public login(@Req() req: Request) {
        return req.user;
    }
}
