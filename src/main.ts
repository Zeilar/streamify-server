import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { EnvConfig } from "./@types/env";
import { AppModule } from "./api/app/app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get<ConfigService<EnvConfig>>(ConfigService);
    await app.listen(configService.get<number>("port"));
}

bootstrap();
