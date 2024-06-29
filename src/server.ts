import { App } from "./app.js";
import { AppDataSource } from "./db/datasource.js";
import { config, logger, messages } from "./utilities/index.js";

class Server extends App {
  private port: number = config.port;
  private hostname: string = config.hostname;
  public server = async () => {
    try {
      // initialize database
      await AppDataSource.initialize();
      logger.info(messages.DB_INIT_SUCCESS);
      // start server
      await this.app.listen(this.port, this.hostname);
      logger.info(
        `\napi running at - ${config.environment !== "PRODUCTION" ? "http" : "https"}://${this.hostname}:${this.port}\n`
      );
    } catch (error) {
      logger.info(`Caught Error!`);
      logger.error(error);
    }
  };
}

new Server().server();
