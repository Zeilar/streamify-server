import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { compare, hash } from "bcrypt";
import { BcryptConfig } from "../../@types/config";

@Injectable()
export class HashService {
    public constructor(
        private readonly configService: ConfigService<BcryptConfig, true>
    ) {}

    public async check(data: string | Buffer, encrypted: string) {
        return await compare(data, encrypted);
    }

    public async hash(data: string | Buffer) {
        return await hash(
            data,
            this.configService.get("bcrypt_saltRounds", {
                infer: true,
            })
        );
    }
}
