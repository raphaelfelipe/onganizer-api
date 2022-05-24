import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

export const authUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repository = AppDataSource.getRepository(User);
    const users = await repository.find();
    const account = users.find((user) => user.id === req.userId);

    if (account?.is_admin) {
      next();
    }
  } catch (error) {
    throw new AppError("Unauthorised access", 401);
  }
};
