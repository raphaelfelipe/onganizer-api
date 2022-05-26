import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError, handleError } from "../errors/appError";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";
export const authToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    const token = request.headers.authorization;
    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          throw new AppError("Invalid token", 401);
        }

        const userFound = users.find(
          (user) => user.email === decoded.email && user.id === decoded.id
        );

        if (userFound) {
          request.userEmail = decoded.email;
          request.userId = decoded.id;

          return next();
        }

        throw new AppError("Invalid token", 401);
      }
    );
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
