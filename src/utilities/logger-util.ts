/*
  source: https://medium.com/@akshaypawar911/how-to-use-winston-daily-rotate-file-logger-in-nodejs-1e1996d2d38
  source: https://www.npmjs.com/package/winston-daily-rotate-file
*/
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { config } from "./index.js";

class Logger {
  logFormat = winston.format.combine(
    winston.format.label({ label: config.logging.label }),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    config.logging.logLevel !== "debug"
      ? winston.format.simple()
      : winston.format.prettyPrint()
  );

  logger = winston.createLogger({
    level: config.logging.logLevel,
    format: this.logFormat,
    transports: [
      new winston.transports.Console({
        level: config.logging.logLevel,
        format: winston.format.combine(
          winston.format.label({ label: config.logging.label }),
          winston.format.timestamp(),
          winston.format.colorize({ all: true }),
          winston.format.printf((info: any) => {
            return `[${info.timestamp}] <${info.level}> ${info.label} : ${info.message}`;
          })
        ),
      }),
      new DailyRotateFile({
        datePattern: config.logging.datePattern,
        dirname: config.logging.logDir,
        filename: `${config.logging.fileName}--%DATE%.json`,
        maxSize: config.logging.maxSize,
        maxFiles: config.logging.maxFiles,
        zippedArchive: true,
        format: winston.format.json(),
      }),
    ],
  });
}

const logger = new Logger().logger;

export { logger };
