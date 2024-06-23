import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { entities } from "../models/entity/index.js";
import { config } from "../utilities/index.js";

const AppDataSource = new DataSource({
  type: "postgres",
  port: Number(config.db.port),
  host: config.db.hostname,
  database: config.db.name,
  username: config.db.username,
  password: config.db.password,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: config.db.shouldSynchronize === true,
  logger: "advanced-console",
  logging: config.environment === "DEV" ? "all" : false,
  entities: entities,
  dropSchema: config.db.shouldDropSchema,
  cache: true,
});

export { AppDataSource };
