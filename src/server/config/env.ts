import type { NODE_ENV } from "../@types/env";

export default () =>
    ({
        port: parseInt(process.env.PORT) || 3000,
        NODE_ENV: process.env.NODE_ENV as NODE_ENV,
        SESSION_SECRET: process.env.SESSION_SECRET,
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    } as const);
