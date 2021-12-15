import env from "src/config/env";

const envConfig = env();

export type NODE_ENV = "development" | "testing" | "production";
export type EnvConfig = typeof envConfig;
