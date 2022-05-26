"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUUID = void 0;
const appError_1 = require("../errors/appError");
const authUUID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: projectId } = req.params;
        const { user_id } = req.body;
        if (!projectId) {
            return next();
        }
        if (!user_id) {
            return next();
        }
        const validate = require('uuid-validate');
        if (!validate(projectId)) {
            throw new appError_1.AppError("uuid not value", 400);
        }
        if (!validate(user_id)) {
            throw new appError_1.AppError("uuid not value", 400);
        }
        return next();
    }
    catch (err) {
        if (err instanceof appError_1.AppError) {
            (0, appError_1.handleError)(err, res);
        }
    }
});
exports.authUUID = authUUID;
