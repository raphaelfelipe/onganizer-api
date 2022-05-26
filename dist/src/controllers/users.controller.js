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
const appError_1 = require("./../errors/appError");
const createUser_service_1 = __importDefault(require("../services/users/createUser.service"));
const listUsers_service_1 = __importDefault(require("../services/users/listUsers.service"));
const listUserById_service_1 = __importDefault(require("../services/users/listUserById.service"));
const deleteUser_service_1 = __importDefault(require("../services/users/deleteUser.service"));
const updateUser_service_1 = __importDefault(require("../services/users/updateUser.service"));
const userListMe_service_1 = __importDefault(require("../services/users/userListMe.service"));
const userLogin_service_1 = __importDefault(require("../services/users/userLogin.service"));
const userListMeFeed_service_1 = __importDefault(require("../services/users/userListMeFeed.service"));
const appError_2 = require("../errors/appError");
class UsersController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, description, password } = req.body;
                const newUser = yield (0, createUser_service_1.default)({
                    name,
                    email,
                    description,
                    password,
                });
                return res.status(201).send(newUser);
            }
            catch (error) {
                if (error instanceof appError_2.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, listUsers_service_1.default)();
                return res.send(users);
            }
            catch (error) {
                if (error instanceof appError_2.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    listById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield (0, listUserById_service_1.default)(id);
                return res.status(200).send(user);
            }
            catch (error) {
                if (error instanceof appError_2.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    userListMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.userEmail;
                const user = yield (0, userListMe_service_1.default)(email);
                return res.status(200).send(user);
            }
            catch (error) {
                if (error instanceof appError_2.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    userListMeFeed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.userId;
                const user = yield (0, userListMeFeed_service_1.default)(id);
                return res.status(200).send(user);
            }
            catch (error) {
                if (error instanceof appError_2.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield (0, userLogin_service_1.default)({ email, password });
                return res.status(201).json({ token });
            }
            catch (error) {
                if (error instanceof appError_2.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { email, password, name, description } = req.body;
                const user = yield (0, updateUser_service_1.default)({
                    id,
                    email,
                    password,
                    name,
                    description,
                });
                return res.status(201).send({ user });
            }
            catch (error) {
                if (error instanceof appError_2.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield (0, deleteUser_service_1.default)(id);
                return res.status(200).json({ message: "User deleted with success" });
            }
            catch (error) {
                if (error instanceof appError_2.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
}
exports.default = UsersController;
