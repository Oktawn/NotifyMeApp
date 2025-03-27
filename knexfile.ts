import type { Knex } from "knex";
import { appConfig } from "./src/config/app.config"

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: appConfig.get("DB_NAME"),
      user: appConfig.get("DB_USER"),
      password: appConfig.get("DB_PASSWORD"),
      port: Number(appConfig.get("DB_EXTERNAL_PORT")),
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  },
};

module.exports = config;
