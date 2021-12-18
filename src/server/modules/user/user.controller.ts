import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { EditUserGuard } from "../../common/guards/editUser.guard";
import { EditUserDto } from "../../common/validators/editUer.validator";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/")
    public async findAll() {
        return await this.userService.findAll();
    }

    @UseGuards(EditUserGuard)
    @Put("/:id")
    public async edit(@Body() editUserDto: EditUserDto) {
        console.log(editUserDto);
        return;
    }
}
