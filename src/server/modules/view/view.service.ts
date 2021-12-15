import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import next from "next";
import { NextServer } from "next/dist/server/next";
import { EnvConfig, NODE_ENV } from "../../@types/env";

@Injectable()
export class ViewService implements OnModuleInit {
    private nextServer: NextServer;

    constructor(private readonly configService: ConfigService<EnvConfig>) {}

    public getNextServer() {
        return this.nextServer;
    }

    public async onModuleInit() {
        try {
            const dev =
                this.configService.get<NODE_ENV>("NODE_ENV") === "development";
            this.nextServer = next({ dev, dir: "./src/client" });
            await this.nextServer.prepare();
        } catch (error) {
            console.error(error);
        }
    }
}
