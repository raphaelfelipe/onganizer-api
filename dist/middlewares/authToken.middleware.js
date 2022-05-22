"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authToken = (request, response, next) => {
    try {
        const token = request.headers.authorization;
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            request.userEmail = decoded.email;
            request.userId = decoded.id;
            next();
        });
    }
    catch (err) {
        return response.status(401).json({
            message: "Invalid token",
        });
    }
};
exports.authToken = authToken;
