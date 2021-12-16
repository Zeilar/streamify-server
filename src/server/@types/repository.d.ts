import { ObjectID } from "typeorm";

export type FindOneId = string | number | Date | ObjectID | undefined;
export interface CreateUserArgs {
    displayName: string;
    email: string;
    password: string;
}
