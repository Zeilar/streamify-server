import {
    Body,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Put,
    UseGuards,
} from "@nestjs/common";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { EditUserGuard } from "../../common/guards/editUser.guard";
import { UserExistsGuard } from "../../common/guards/userExists.guard";
import { EditUserDto } from "../../common/validators/editUser.validator";
import { FindOneParams } from "../../common/validators/findOneParams.validator";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
    public constructor(private readonly userService: UserService) {}

    @Get("/")
    public all() {
        return this.userService.all();
    }

    @UseGuards(UserExistsGuard, AuthenticatedGuard, EditUserGuard)
    @HttpCode(204)
    @Put("/:id")
    public async edit(
        @Body() editUserDto: EditUserDto,
        @Param() params: FindOneParams
    ) {
        if (!(await this.userService.exists(params.id))) {
            throw new NotFoundException();
        }
        this.userService.edit(params.id, editUserDto);
    }
}
