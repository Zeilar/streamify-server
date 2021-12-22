import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { HashModule } from "../hash/hash.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.seralizer";

@Module({
    imports: [
        UserModule,
        HashModule,
        PassportModule.register({ session: true }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
