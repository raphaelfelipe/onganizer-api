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
const createUser_service_1 = __importDefault(require("../../services/users/createUser.service"));
const deleteUser_service_1 = __importDefault(require("../../services/users/deleteUser.service"));
const listUserById_service_1 = __importDefault(require("../../services/users/listUserById.service"));
const listUsers_service_1 = __importDefault(require("../../services/users/listUsers.service"));
const updateUser_service_1 = __importDefault(require("../../services/users/updateUser.service"));
const userListMe_service_1 = __importDefault(require("../../services/users/userListMe.service"));
const userLogin_service_1 = __importDefault(require("../../services/users/userLogin.service"));
describe("User creation", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => {
            console.log("Error during DataSource initialisation", error);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    let token;
    let id;
    let email = "test@gmail.com";
    let name = "testName";
    const password = "HiIamAPassword";
    let description = "Test description";
    let created_at;
    let updated_at;
    test("Should create a new user in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = { email, name, password, description };
        const userTest = yield (0, createUser_service_1.default)(userData);
        id = userTest === null || userTest === void 0 ? void 0 : userTest.id;
        created_at = userTest === null || userTest === void 0 ? void 0 : userTest.created_at;
        updated_at = userTest === null || userTest === void 0 ? void 0 : userTest.updated_at;
        expect(userTest).toHaveProperty("id");
        expect(userTest).toHaveProperty("created_at");
        expect(userTest).toHaveProperty("updated_at");
        expect(userTest).toEqual(expect.objectContaining({
            name,
            description,
            email,
        }));
    }));
    test("Should make user login", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = { email, password };
        const userTest = yield (0, userLogin_service_1.default)(userData);
        token = userTest;
        expect({ token }).toHaveProperty("token");
    }));
    test("Should list one user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userTest = yield (0, listUserById_service_1.default)(id);
        expect(userTest).toEqual(expect.objectContaining({
            id,
            name,
            description,
        }));
    }));
    test("Should update the user information", () => __awaiter(void 0, void 0, void 0, function* () {
        name = "test name updated";
        description = "Test description updated";
        email = "test2@gmail.com";
        const userData = { id, email, name, description, password };
        const userTest = yield (0, updateUser_service_1.default)(userData);
        expect(userTest.UpdatedInfo).toEqual(expect.objectContaining({
            name: name,
            email: email,
            password: password,
            description: description,
        }));
        expect(userTest.message).toEqual(expect.stringContaining("User successfully updated"));
    }));
    test("Should list user by email", () => __awaiter(void 0, void 0, void 0, function* () {
        const userTest = yield (0, userListMe_service_1.default)(email);
        expect(userTest).toEqual(expect.objectContaining({
            id,
            name,
            description,
            email,
            created_at,
            updated_at
        }));
    }));
    test("Should list all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const userTest = yield (0, listUsers_service_1.default)();
        expect(userTest.length).toEqual(1);
        expect(userTest[0]).toHaveProperty("id");
        expect(userTest[0]).toHaveProperty("name");
        expect(userTest[0]).toHaveProperty("description");
    }));
    test("Should delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userTest = yield (0, deleteUser_service_1.default)(id);
        expect(userTest).toEqual(true);
    }));
});
