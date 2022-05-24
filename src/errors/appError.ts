import { Response } from "express";

export class AppError extends Error {
  statusCode;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const handleError = (error: AppError, res: Response) => {
  const { message, statusCode } = error;

  return res.status(statusCode).json({
    status: "error",
    message,
    statusCode,
  });
};
