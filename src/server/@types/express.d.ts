import { UserSchema } from "./user";

declare global {
    namespace Express {
        export interface User extends UserSchema {}
    }
}
