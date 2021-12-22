import { Module } from "@nestjs/common";
import { HashService } from "./hash.service";
import { ConfigModule } from "@nestjs/config";
import bcrypt from "../../config/bcrypt";

@Module({
    imports: [ConfigModule.forRoot({ load: [bcrypt] })],
    providers: [HashService],
    exports: [HashService],
})
export class HashModule {}
