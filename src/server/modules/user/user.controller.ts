import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { EditUserGuard } from "../../common/guards/editUser.guard";
import { UserExistsGuard } from "../../common/guards/userExists.guard";
import { EditUserDto } from "../../common/validators/editUser.validator";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/")
    public async findAll() {
        return await this.userService.findAll();
    }

    @UseGuards(UserExistsGuard, AuthenticatedGuard, EditUserGuard)
    @Put("/:id")
    public async edit(@Body() editUserDto: EditUserDto) {
        console.log(editUserDto);
        return;
    }
}
