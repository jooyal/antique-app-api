import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    context: {
      user: {
        id: string;
      };
    };
  }
}
// https://plusreturn.com/blog/how-to-extend-express-request-interface-in-typescript/
