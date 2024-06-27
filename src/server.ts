import { AppDataSource } from "./db/datasource.js";
import { App } from "./app.js";
import { config, messages } from "./utilities/index.js";

class Server extends App {
  private port: number = config.port;
  private hostname: string = config.hostname;
  public server = async () => {
    try {
      // initialize database
      await AppDataSource.initialize();
      console.log(messages.DB_INIT_SUCCESS);
      // start server
      await this.app.listen(this.port, this.hostname);
      console.log(
        `\napi running at - ${config.environment !== "PRODUCTION" ? "http" : "https"}://${this.hostname}:${this.port}\n`
      );
    } catch (error) {
      console.log(`\n\nCaught Error!\n\n`);
      console.error(error);
    }
  };
}

new Server().server();
