import bcrypt from "../config/bcrypt";
import env from "../config/env";

const envConfig = env();
const bcryptConfig = bcrypt();

export type EnvConfig = typeof envConfig;
export type BcryptConfig = typeof bcryptConfig;
