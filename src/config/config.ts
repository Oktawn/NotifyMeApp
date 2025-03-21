import { ConfigService } from "@nestjs/config";

interface EnvConfig {
  PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: number;
  DB_EXTERNAL_PORT: number;
}


export class EnvService {

  constructor(private configService: ConfigService) {
  }

  public get(key: (keyof EnvConfig)): number | string {
    const value = this.configService.get<number | string>(key);
    if (!value) {
      throw new Error(`Config error: ${key} is not defined`);
    }
    return value;
  }
}
export const config = new EnvService(new ConfigService());