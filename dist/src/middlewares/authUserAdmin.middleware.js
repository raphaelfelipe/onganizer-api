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
exports.authUserOrAdmin = void 0;
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entities/user.entity");
const appError_1 = require("../errors/appError");
const authUserOrAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        const users = yield repository.find();
        const account = users.find((user) => user.id === req.userId);
        if (account === null || account === void 0 ? void 0 : account.is_admin) {
            return next();
        }
        const { id } = req.params;
        if ((account === null || account === void 0 ? void 0 : account.id) === id) {
            return next();
        }
        else {
            throw new appError_1.AppError("Unauthorised access", 401);
        }
    }
    catch (error) {
        if (error instanceof appError_1.AppError) {
            (0, appError_1.handleError)(error, res);
        }
    }
});
exports.authUserOrAdmin = authUserOrAdmin;
