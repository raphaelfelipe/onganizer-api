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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const user_entity_1 = require("../../entities/user.entity");
const appError_1 = require("../../errors/appError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const updateUserService = ({ id, email, password, name, description, }) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const users = yield repository.find();
    const user = users.find((user) => user.id === id);
    if (!user) {
        throw new appError_1.AppError("User not found", 404);
    }
    const emailFound = users.find((user) => user.email === email);
    if (emailFound) {
        throw new appError_1.AppError("Email already in use", 409);
    }
    yield repository.update(user.id, {
        name: name,
        email: email,
        password: password && bcrypt_1.default.hashSync(password, 10),
        description: description,
    });
    return {
        message: "User successfully updated",
        UpdatedInfo: {
            name: name,
            email: email,
            password: password,
            description: description,
        },
    };
});
exports.default = updateUserService;
