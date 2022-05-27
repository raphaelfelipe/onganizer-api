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
const data_source_1 = require("../../data-source");
const user_entity_1 = require("../../entities/user.entity");
const appError_1 = require("../../errors/appError");
const listUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const users = yield repository.find();
    const user = users.find(user => user.id === id);
    const usersReturn = users.map((user) => (Object.assign(Object.assign({}, user), { email: undefined, created_at: undefined, updated_at: undefined, is_admin: undefined })));
    if (!user) {
        throw new appError_1.AppError("User not found", 404);
    }
    return Object.assign(Object.assign({}, user), { password: undefined, email: undefined, created_at: undefined, updated_at: undefined, is_admin: undefined });
});
exports.default = listUserByIdService;
