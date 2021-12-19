import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { EditUserGuard } from "../../common/guards/editUser.guard";
import { UserExistsGuard } from "../../common/guards/userExists.guard";
import { EditUserDto } from "../../common/validators/editUser.validator";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
    public constructor(private readonly userService: UserService) {}

    @Get("/")
    public async all() {
        return await this.userService.all();
    }

    @UseGuards(UserExistsGuard, AuthenticatedGuard, EditUserGuard)
    @Put("/:id")
    public async edit(
        @Body() editUserDto: EditUserDto,
        @Param("id") id: number
    ) {
        await this.userService.edit(id, editUserDto);
        return;
    }
}
