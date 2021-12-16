import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Module({
    imports: [UserService],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
