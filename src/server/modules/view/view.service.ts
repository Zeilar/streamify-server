import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import next from "next";
import { NextServer } from "next/dist/server/next";
import { EnvConfig } from "../../@types/config";

@Injectable()
export class ViewService implements OnModuleInit {
    private nextServer: NextServer;

    public constructor(
        private readonly configService: ConfigService<EnvConfig, true>
    ) {}

    public getNextServer() {
        return this.nextServer;
    }

    public onModuleInit() {
        try {
            const dev =
                this.configService.get("NODE_ENV", { infer: true }) ===
                "development";
            this.nextServer = next({ dev, dir: "./src/client" });
            this.nextServer.prepare();
        } catch (error) {
            console.error(error);
        }
    }
}
