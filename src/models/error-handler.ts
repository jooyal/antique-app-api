import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { config } from "../utilities/config.js";
import { logger } from "../utilities/logger-util.js";
import { messages } from "../utilities/messages.js";
import { NodeEnvEnum } from "./enum/app.enum.js";

function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  __: NextFunction
) {
  // for internal failures in prod env, use 500 error code.
  const errorStatusCode =
    (config.environment === NodeEnvEnum.PRODUCTION &&
      error?.status &&
      Math.floor(parseInt(error.status))) === 5
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

  // remove stack in production environment.
  if (config.environment !== NodeEnvEnum.DEVELOPMENT) {
    delete errorObj.error.stack
  }
  return res.status(errorStatusCode).json(errorObj);
}

export { errorMiddleware };
