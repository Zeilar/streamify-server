import env from "../config/env";
import bcrypt from "../config/bcrypt";
import video from "../config/video";

const envConfig = env();
const bcryptConfig = bcrypt();
const videoConfig = video();

export type EnvConfig = typeof envConfig;
export type BcryptConfig = typeof bcryptConfig;
export type VideoConfig = typeof videoConfig;
