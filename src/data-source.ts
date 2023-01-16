import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import "dotenv/config";
import "reflect-metadata";

const setDataSourceConfig = (): DataSourceOptions => {
  if (process.env.NODE_ENV === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [path.join(__dirname, "./entities/**.{js,ts}")],
      migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
    };
  }

  if (process.env.NODE_ENV === "test")
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: ["src/entities/*.ts"],
    };

  return {
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT!),
    username: process.env.PGUSER,
    password: 'julitha123',
    database: process.env.PGDATABASE,
    logging: true,
    synchronize: false,
    entities: [path.join(__dirname, "./entities/**.{js,ts}")],
    migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
  };
};

const dataSourceConfig = setDataSourceConfig();
export default new DataSource(dataSourceConfig);
