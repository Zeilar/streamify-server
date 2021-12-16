import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { EnvConfig } from "./@types/config";
import { AppModule } from "./modules/app/app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get<ConfigService<EnvConfig>>(ConfigService);
    await app.listen(configService.get<number>("port"));
}

bootstrap();
