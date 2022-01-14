import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { User } from "../user/user.entity";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: User, done: (err: Error | null, user: User) => void) {
        done(null, user);
    }
    deserializeUser(
        payload: any,
        done: (err: Error | null, payload: string) => void
    ) {
        done(null, payload);
    }
}
