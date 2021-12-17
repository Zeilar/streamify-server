import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import passport from "passport";
import { EnvConfig } from "./@types/config";
import { AppModule } from "./modules/app/app.module";
import session from "express-session";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get<ConfigService<EnvConfig>>(ConfigService);

    app.use(
        session({
            secret: "nest cats",
            resave: false,
            saveUninitialized: false,
        }),
        passport.initialize(),
        passport.session()
    );

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.listen(configService.get<number>("port"));
}

bootstrap();
