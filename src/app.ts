

// const app: Express = express();
// const port: number = config.port;
// const hostname: string = config.hostname;
// https://www.npmjs.com/package/rate-limiter-flexible
// const main = () => {
//   app.use("/", (_, res) => res.send("Working!"));

//   app.listen(port, hostname, () => {
//     console.log(
//       `\napi running at ${config.environment !== "PRODUCTION" ? "http" : "https"}://${hostname}:${port}\n`
//     );
//   });
// };

// AppDataSource.initialize()
//   .then(() => {
//     console.log(messages.DB_INIT_SUCCESS);
//     main();
//   })
//   .catch((error) => {
//     console.error(error);
//   });

import express, { Express } from "express";
import "reflect-metadata";
import { baseAPIRouter } from "./routes/index.js";
// import { config, messages } from "./utilities/index.js";
// import helmet from 'helmet';
// import xss from 'xss-clean';
// import compression from 'compression';
// import cors from 'cors';
// import mongoSanitize from 'express-mongo-sanitize';
// import swaggerUI from 'swagger-ui-express';
// import createLocaleMiddleware from 'express-locale';

class App {
  protected app: Express;
  private APP_NAME: string = "antique-app";
  private API_PATH_V1: string = "api/v1";
  private SWAGGER_PATH_V1: string = "api/docs/v1";
  constructor() {
    this.app = express();
    // Set security HTTP headers
    // app.use(helmet());

    // Set Body parser, reading data from body into req.body
    this.app.use(express.json({ limit: "10kb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10kb" }));

    // Get the user's locale, and set a default in case there's none
    // this.app.use(
    //   createLocaleMiddleware({
    //     priority: ["accept-language", "default"],
    //     default: "en_US",
    //   })
    // );

    // Start polyglot and set the language in the req with the phrases to be used
    // this.app.use(startPolyglot);

    // Data sanitization against XSS
    // this.app.use(xss());

    // Implement CORS
    // this.app.use(cors());
    // this.app.options("*", cors());

    // app.use(compression());

    // this.app.disable("x-powered-by");

    // Limit Repeated Failed Requests to Auth Endpoints
    // if (config.env === "production") {
    //   this.app.use("/api", limiter);
    // }

    // healthcheck
    this.app.use(
      `/${this.APP_NAME}/healthcheck`,
      /*healthCheckRoute*/ (_, res) => res.send(200)
    );

    // API documentation
    this.app.use(
      `/${this.APP_NAME}/${this.SWAGGER_PATH_V1}`,
      /*swaggerRoute*/ (_, res) => res.send(200)
    );

    // API routes
    this.app.use(`/${this.APP_NAME}/${this.API_PATH_V1}`, baseAPIRouter);
  }
}

export { App };
