import { NextFunction, Request, Response } from "express";

const protect = (req: Request, __: Response, next: NextFunction) => {
  // decode token and extract user
  const extractedUser = { id: "test" };

  req.context = { ...req.context, user: extractedUser };
  next();
};

export { protect };
