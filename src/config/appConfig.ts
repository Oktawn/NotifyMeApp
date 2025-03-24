import { config } from "dotenv";
import path from "node:path";

interface IAppConfig {
  PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: number;
  DB_EXTERNAL_PORT: number;
}

class AppConfig {
  constructor() {
    const envDev = path.resolve(__dirname, "../../.env.development");
    const envProd = path.resolve(__dirname, "../../.env.production");
    const env = process.env.NODE_ENV === "production" ? envProd : envDev;
    const { error, parsed } = config({ path: env });
    if (error) {
      throw new Error(`Error loading .env file: ${error}`);
    }
    if (!parsed) {
      throw new Error("Error parsing .env file");
    }
  }

  public get(key: (keyof IAppConfig)): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }
}

export const appConfig = new AppConfig();