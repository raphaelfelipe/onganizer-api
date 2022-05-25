import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError, handleError } from "../errors/appError";

export const authToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers.authorization;

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (!err) {
          request.userEmail = decoded.email;
          request.userId = decoded.id;
          return next();
        }
      }
    );
    throw new AppError("Invalid token", 401);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
