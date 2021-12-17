import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public password: string;
}
