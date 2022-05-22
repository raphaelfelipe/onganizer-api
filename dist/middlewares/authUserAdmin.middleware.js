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
const authUserOrAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        const users = yield repository.find();
        const account = users.find(user => user.id === req.userId);
        if (account === null || account === void 0 ? void 0 : account.is_admin) {
            next();
        }
        const { id: userId } = req.params;
        if (userId === req.userId) {
            next();
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        return res.status(401).json({
            message: "You are not an admin and you are not allowed to do that on this user"
        });
    }
});
exports.authUserOrAdmin = authUserOrAdmin;
