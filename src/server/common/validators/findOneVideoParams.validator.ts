import { IsString } from "class-validator";

export class FindOneVideoParams {
    @IsString()
    id: string;
}
