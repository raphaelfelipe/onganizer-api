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
const user_entity_1 = require("../../entities/user.entity");
const data_source_1 = require("../../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = require("../../errors/appError");
const userCreateService = ({ name, email, password, description, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const users = yield userRepository.find();
    const emailAlreadyExists = users.find((user) => user.email === email);
    if (emailAlreadyExists) {
        throw new appError_1.AppError("Email already in use", 409);
    }
    if (!name || !email || !password) {
        throw new appError_1.AppError("Missing name, email or password", 422);
    }
    if (!description) {
        description = "";
    }
    const user = new user_entity_1.User();
    user.name = name;
    user.email = email;
    user.password = bcrypt_1.default.hashSync(password, 10);
    user.description = description;
    userRepository.create(user);
    yield userRepository.save(user);
    return yield userRepository
        .createQueryBuilder("user")
        .select([
        "user.id",
        "user.name",
        "user.email",
        "user.description",
        "user.created_at",
        "user.updated_at",
    ])
        .where({ id: user.id })
        .getOne();
});
exports.default = userCreateService;
