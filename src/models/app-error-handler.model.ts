import { randomUUID } from "crypto";

class AppError extends Error {
  status: number;
  referenceId: string; //this is to trace the exact error from the logs.
  constructor(message: string, status: number) {
    super();
    this.status = status;
    this.referenceId = randomUUID();
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };

// https://www.reddit.com/r/node/comments/159jiks/questions_about_cryptorandomuuid_entropy_cache/
// https://www.nearform.com/insights/new-crypto-capabilities-in-node-js/
// https://geshan.com.np/blog/2022/01/nodejs-uuid/