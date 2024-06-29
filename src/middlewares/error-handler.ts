import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { NodeEnvEnum } from "../models/enum/app.enum.js";
import { config, logger, messages } from "../utilities/index.js";

function errorMiddleware(error: any, req: Request, res: Response, __: NextFunction) {
  // for internal failures in prod env, use 500 error code.
  const errorStatusCode =
    (config.environment === NodeEnvEnum.PRODUCTION && error?.status && Math.floor(parseInt(error.status) / 100)) === 5
      ? 500
      : error?.status
        ? error.status
        : 500;
  const errorStack = error?.stack ? error.stack : "";
  const errorObj = {
    error: {
      status: errorStatusCode,
      message: error?.message || messages.ERROR_CODE_MESSAGE[500],
      referenceId: error?.referenceId || randomUUID(),
      stack: errorStack,
    },
  };

  // log the error for tracing purpose.
  logger.error({ ...errorObj, requestBody: req.body });

  // replace with standard message in case of 500 error before sending to client.
  if (errorObj.error.status === 500) {
    errorObj.error.message = messages.ERROR_CODE_MESSAGE[500];
  }

  // remove stack in production environment.
  if (config.environment !== NodeEnvEnum.DEVELOPMENT) {
    delete errorObj.error.stack;
  }

  res.status(errorStatusCode).json(errorObj);
}

export { errorMiddleware };
