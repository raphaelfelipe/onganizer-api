"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
const handleError = (error, res) => {
    const { message, statusCode } = error;
    return res.status(statusCode).json({
        status: "error",
        message,
        statusCode,
    });
};
exports.handleError = handleError;
