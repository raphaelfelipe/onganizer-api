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
    test("Should create a new user in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "test@gmail.com";
        const name = "testName";
        const password = "HiIamAPassword";
        const description = "Test description";
        const userData = { email, name, password, description };
        const userTest = yield (0, createUser_service_1.default)(userData);
        expect(userTest).toHaveProperty("id");
        expect(userTest).toHaveProperty("created_at");
        expect(userTest).toHaveProperty("updated_at");
        expect(userTest).toEqual(expect.objectContaining({
            name,
            description,
            email,
        }));
    }));
});
