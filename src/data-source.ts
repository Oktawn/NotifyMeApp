import { DataSource } from "typeorm";
import { appConfig } from "./config/app.config";
import "reflect-metadata";

export const dataSource = new DataSource({
  type: "postgres",
  port: Number(appConfig.get("DB_EXTERNAL_PORT")),
  username: appConfig.get("DB_USER"),
  password: appConfig.get("DB_PASSWORD"),
  database: appConfig.get("DB_NAME"),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  cache: {
    duration: 10000
  },
});