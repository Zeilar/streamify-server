import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { LoginGuard } from "../../common/guards/login.guard";
import { CreateUserDto } from "../../common/validators/register.validator";
import { UserService } from "../user/user.service";

@Controller("/auth")
export class AuthController {
    public constructor(private readonly userService: UserService) {}

    @Post("/register")
    public async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
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

    @Get("/logout")
    public logout(@Req() req: Request) {
        req.logOut();
    }
}
