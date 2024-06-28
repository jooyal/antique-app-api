import { randomUUID } from "crypto";

class AppError extends Error {
  status: number;
  referenceId: string; //this is to trace the exact error from the logs.
  constructor(message: string, status: number) {
    super();
    this.status = status;
    this.referenceId = randomUUID({ disableEntropyCache: true });
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };
