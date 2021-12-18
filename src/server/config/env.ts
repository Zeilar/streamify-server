import type { NODE_ENV } from "../@types/env";

export default () =>
    ({
        port: parseInt(process.env.PORT) || 3000,
        NODE_ENV: process.env.NODE_ENV as NODE_ENV,
        SESSION_SECRET: process.env.SESSION_SECRET,
    } as const);
