import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

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
        request.userEmail = decoded.email;
        request.userId = decoded.id;
        next();
      }
    );
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
};
