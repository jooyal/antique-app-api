import "reflect-metadata";
import express, { Express } from "express";
import { AppDataSource } from "./db/datasource.js";
import { config, messages } from "./utilities/index.js";

const app: Express = express();
const port: number = config.port;
const hostname: string = config.hostname;

const main = () => {
  // app.use(compression());
  // app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/", (_, res) => res.send("Working!"));

  app.listen(port, hostname, () => {
    console.log(
      `\napi running at ${config.environment !== "PRODUCTION" ? "http" : "https"}://${hostname}:${port}\n`
    );
  });
};

AppDataSource.initialize()
  .then(() => {
    console.log(messages.DB_INIT_SUCCESS);
    main();
  })
  .catch((error) => {
    console.error(error);
  });
