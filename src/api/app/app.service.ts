import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import next from "next";
import { EnvConfig, NODE_ENV } from "src/@types/env";

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService<EnvConfig>) {}

    public async mountNextApp() {
        const dev =
            this.configService.get<NODE_ENV>("NODE_ENV") === "development";
        const app = next({ dev, dir: "../../client" });
        await app.prepare();
        return app;
    }
}
