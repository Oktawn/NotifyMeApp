import { config } from "dotenv";
import path from "node:path";

interface IAppConfig {
  API_PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: number;
  DB_EXTERNAL_PORT: number;
  JWT_SECRET: string;
}

class AppConfig {
  constructor() {
    const envDev = path.resolve(__dirname, "../../.env.development");
    const envProd = path.resolve(__dirname, "../../.env.production");
    const envTest = path.resolve(__dirname, "../../.env");
    const env = envTest;
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