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
const createUser_service_1 = __importDefault(require("../services/users/createUser.service"));
const listUsers_service_1 = __importDefault(require("../services/users/listUsers.service"));
const listUserById_service_1 = __importDefault(require("../services/users/listUserById.service"));
const deleteUser_service_1 = __importDefault(require("../services/users/deleteUser.service"));
const updateUser_service_1 = __importDefault(require("../services/users/updateUser.service"));
const userListMe_service_1 = __importDefault(require("../services/users/userListMe.service"));
const userLogin_service_1 = __importDefault(require("../services/users/userLogin.service"));
const userListMeFeed_service_1 = __importDefault(require("../services/users/userListMeFeed.service"));
class UsersController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, description, password, is_admin = false } = req.body;
                const newUser = yield (0, createUser_service_1.default)({
                    name,
                    email,
                    description,
                    password,
                    created_at: new Date(),
                    updated_at: new Date(),
                    is_admin,
                });
                return res.status(201).send(newUser);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
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
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
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
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
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
            catch (err) {
                if (err instanceof Error) {
                    return res.status(401).send({
                        error: err.name,
                        message: err.message,
                    });
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
            catch (err) {
                if (err instanceof Error) {
                    return res.status(401).send({
                        error: err.name,
                        message: err.message,
                    });
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
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { email, password, name, description } = req.body;
                const user = yield (0, updateUser_service_1.default)({ id, email, password, name, description });
                return res.status(201).send({
                    message: "User updated!",
                    user
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        "error": err.name,
                        "message": err.message
                    });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield (0, deleteUser_service_1.default)(id);
                return res.status(200).json({ message: "User deleted with succes!" });
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
}
exports.default = UsersController;
