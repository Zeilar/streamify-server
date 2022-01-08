import type { NODE_ENV } from "../@types/env";

export default () =>
    ({
        PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
        NODE_ENV: process.env.NODE_ENV as NODE_ENV,
        SESSION_SECRET: process.env.SESSION_SECRET as string,
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY as string,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN as string,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID as string,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET as string,
        FIREBASE_MESSAGING_SENDER_ID: process.env
            .FIREBASE_MESSAGING_SENDER_ID as string,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID as string,
    } as const);
