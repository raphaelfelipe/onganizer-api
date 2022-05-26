import { NextFunction, Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import uuidValidateV4 from "../utils/uuidValidator";

export const authUUID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!uuidValidateV4(id)) {
      throw new AppError("id not valid", 422);
    }

    return next();
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
