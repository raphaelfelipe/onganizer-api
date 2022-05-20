import { Request, Response, NextFunction } from "express";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.params;

    if (userId !== req.userId) {
      throw new Error();
    }
    next();

  } catch (err) {
    return res.status(401).json({
      message: "You are not allowed to do that on this user",
    });
  }
};
