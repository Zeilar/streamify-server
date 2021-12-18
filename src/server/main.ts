import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import passport from "passport";
import { EnvConfig } from "./@types/config";
import { AppModule } from "./modules/app/app.module";
import session from "express-session";
import { ValidationPipe } from "@nestjs/common";
import { DateHelper } from "./common/helpers/Date.helper";
import { NODE_ENV } from "./@types/env";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get<ConfigService<EnvConfig>>(ConfigService);
    const dateHelper = app.get(DateHelper);

    app.use(
        session({
            secret: configService.get<string>("SESSION_SECRET"),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: dateHelper.DAY_IN_MILLISECONDS * 7,
                httpOnly: true,
                secure:
                    configService.get<NODE_ENV>("NODE_ENV") === "production",
                sameSite: "strict",
            },
        }),
        passport.initialize(),
        passport.session()
    );

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix("/api/v1");

    await app.listen(configService.get<number>("port"));
}

bootstrap();
