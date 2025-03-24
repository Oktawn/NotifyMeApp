import type { Knex } from "knex";
import { configEnv } from "src/config/config";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: configEnv.get("DB_NAME"),
      user: configEnv.get("DB_USER"),
      password: configEnv.get("DB_PASSWORD"),
      port: configEnv.get("DB_EXTERNAL_PORT"),
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
