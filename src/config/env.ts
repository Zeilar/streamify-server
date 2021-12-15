import type { NODE_ENV } from "src/@types/env";

export default () =>
    ({
        port: parseInt(process.env.PORT) || 3000,
        NODE_ENV: "development" as NODE_ENV,
    } as const);
