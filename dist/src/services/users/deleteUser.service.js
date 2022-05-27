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
const project_entity_1 = require("../../entities/project.entity");
const appError_1 = require("../../errors/appError");
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const users = yield userRepository.find();
    const projects = yield projectRepository.find({ relations: ["users"] });
    const user = users.find((user) => user.id === id);
    const projectArray = projects.filter((project) => project.users.some((item) => item.id === id));
    console.log(projectArray);
    projectArray.forEach((project) => __awaiter(void 0, void 0, void 0, function* () {
        if (project.users.length === 1) {
            yield projectRepository.update(project.id, { active: false });
        }
    }));
    if (!user) {
        throw new appError_1.AppError("User not found", 404);
    }
    yield userRepository.delete(user.id);
    return true;
});
exports.default = deleteUserService;
