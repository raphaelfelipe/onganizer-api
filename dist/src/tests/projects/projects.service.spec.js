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
const projectCreate_service_1 = __importDefault(require("../../services/projects/projectCreate.service"));
const projectDelete_service_1 = __importDefault(require("../../services/projects/projectDelete.service"));
const projectList_service_1 = __importDefault(require("../../services/projects/projectList.service"));
const projectListOne_service_1 = __importDefault(require("../../services/projects/projectListOne.service"));
const projectUpdate_service_1 = __importDefault(require("../../services/projects/projectUpdate.service"));
const projectUsers_service_1 = __importDefault(require("../../services/projects/projectUsers.service"));
const projectUsersCreate_service_1 = __importDefault(require("../../services/projects/projectUsersCreate.service"));
const createUser_service_1 = __importDefault(require("../../services/users/createUser.service"));
describe("Project tests", () => {
    let connection;
    let user_id_test;
    let project_id_test;
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
        user_id_test = userTest === null || userTest === void 0 ? void 0 : userTest.id;
        expect(userTest).toHaveProperty("id");
        expect(userTest).toHaveProperty("created_at");
        expect(userTest).toHaveProperty("updated_at");
        expect(userTest).toEqual(expect.objectContaining({
            name,
            description,
            email,
        }));
    }));
    test("Should create a new project in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const user_id = user_id_test;
        const name = "testName";
        const objective = "None";
        const description = "Test description";
        const userData = { user_id, name, description, objective };
        const projectTest = yield (0, projectCreate_service_1.default)(userData);
        project_id_test = projectTest === null || projectTest === void 0 ? void 0 : projectTest.id;
        expect(projectTest).toHaveProperty("id");
        expect(projectTest).toHaveProperty("created_at");
        expect(projectTest).toHaveProperty("updated_at");
        expect(projectTest).toEqual(expect.objectContaining({
            name,
            description,
            objective,
        }));
    }));
    test("Should list one project by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = project_id_test;
        const projectData = { id };
        const projectTest = yield (0, projectListOne_service_1.default)(projectData);
        expect(projectTest).toHaveProperty("id");
        expect(projectTest).toHaveProperty("objective");
        expect(projectTest).toHaveProperty("name");
        expect(projectTest).toHaveProperty("description");
        expect(projectTest).toHaveProperty("created_at");
        expect(projectTest).toHaveProperty("updated_at");
        expect(projectTest).toHaveProperty("active");
    }));
    test("Should list all projects", () => __awaiter(void 0, void 0, void 0, function* () {
        const projectTest = yield (0, projectList_service_1.default)();
        expect(projectTest).toHaveLength(1);
    }));
    test("Should update one project", () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "Updated project name";
        const active = true;
        const objective = "Test objective update";
        const description = "Test description update";
        const id = project_id_test;
        const projectData = { id, active, objective, name, description };
        const projectTest = yield (0, projectUpdate_service_1.default)(projectData);
        expect(projectTest.UpdatedInfo).toEqual(expect.objectContaining({
            name,
            active,
            objective,
            description,
        }));
        expect(projectTest.message).toEqual(expect.stringContaining("Project successfully updated"));
    }));
    test("Should list all project users", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = project_id_test;
        const projectData = { id };
        const projectTest = yield (0, projectUsers_service_1.default)(projectData);
        expect(projectTest === null || projectTest === void 0 ? void 0 : projectTest.users).toHaveLength(1);
    }));
    test("Should list all project users", () => __awaiter(void 0, void 0, void 0, function* () {
        const project_id = project_id_test;
        const user_id = user_id_test;
        const projectData = { project_id, user_id };
        const projectTest = yield (0, projectUsersCreate_service_1.default)(projectData);
        expect(projectTest === null || projectTest === void 0 ? void 0 : projectTest.users).toHaveLength(1);
    }));
    test("Should delete one project", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = project_id_test;
        const projectData = id;
        const projectTest = yield (0, projectDelete_service_1.default)(projectData);
        expect(projectTest).toBe(true);
    }));
});
