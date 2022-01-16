import {
    Body,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Put,
    UseFilters,
    UseGuards,
} from "@nestjs/common";
import { EmailTakenException } from "../../common/exceptions/EmailTakenException.exception";
import { UserNotFoundException } from "../../common/exceptions/userNotFound.exception";
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
    @UseFilters(UserNotFoundException, EmailTakenException)
    public edit(
        @Body() editUserDto: EditUserDto,
        @Param() params: FindOneParams
    ) {
        this.userService.edit(params.id, editUserDto);
    }
}
