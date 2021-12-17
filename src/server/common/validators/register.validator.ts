import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public displayName: string;

    @IsNotEmpty()
    public password: string;
}
