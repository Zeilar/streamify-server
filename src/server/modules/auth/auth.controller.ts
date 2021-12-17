import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    ValidationPipe,
} from "@nestjs/common";
import { Request } from "express";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { LoginGuard } from "../../common/guards/login.guard";
import { UserService } from "../user/user.service";

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

    @UseGuards(LoginGuard)
    @Post("/login")
    public login(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get("/whoami")
    public whoami(@Req() req: Request) {
        return req.user;
    }
}
