import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError, handleError } from "../errors/appError";

export const authUserOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repository = AppDataSource.getRepository(User);
    const users = await repository.find();
    const account = users.find((user) => user.id === req.userId);

    if (account?.is_admin) {
      return next();
    }

    const { id } = req.params;

    if (account?.id === id) {
      return next();
    } else {
      throw new AppError("Unauthorised access", 401);
    }
  } catch (error) {
    if (error instanceof AppError) handleError(error, res);
  }
};
