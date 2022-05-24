import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.params;

    if (userId !== req.userId) {
      throw new AppError("Unauthorised access", 401);
    }
    next();
  } catch (error) {
    throw new AppError("Unauthorised access", 401);
  }
};
