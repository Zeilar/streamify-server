import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import bcrypt from "../../config/bcrypt";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Module({
    imports: [
        UserModule,
        PassportModule,
        ConfigModule.forRoot({
            load: [bcrypt],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
