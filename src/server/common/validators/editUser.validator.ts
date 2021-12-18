import { IsNotEmpty } from "class-validator";

export class EditUserDto {
    public email?: string;
    public displayName?: string;

    @IsNotEmpty()
    public password: string;
}
