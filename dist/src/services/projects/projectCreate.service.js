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
const project_entity_1 = require("../../entities/project.entity");
const data_source_1 = require("../../data-source");
const user_entity_1 = require("../../entities/user.entity");
const appError_1 = require("../../errors/appError");
const projectCreateService = ({ user_id, name, description, objective }) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const projects = yield projectRepository.find();
    const projectAlreadyExists = projects.find((project) => project.name === name);
    if (projectAlreadyExists) {
        throw new appError_1.AppError("Project already exists", 409);
    }
    const projectUserRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const user = yield projectUserRepository.find({
        select: ["id", "name", "description"],
        where: { id: user_id }
    });
    const project = new project_entity_1.Project();
    project.name = name;
    project.description = description;
    project.objective = objective;
    project.active = true;
    project.users = [user[0]];
    projectRepository.create(project);
    yield projectRepository.save(project);
    return project;
});
exports.default = projectCreateService;
