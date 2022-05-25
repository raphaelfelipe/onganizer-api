import { NextFunction, Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";

export const authUUID = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: projectId } = req.params;

        if (!projectId) {
            return next()
        }

        const validate = require('uuid-validate');

        if (!validate(projectId)) {
            throw new AppError("uuid not value", 400);
        }

        return next()

    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res)
        }
    }
}