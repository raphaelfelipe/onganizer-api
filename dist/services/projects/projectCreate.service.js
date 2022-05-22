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
const project_user_entity_1 = require("../../entities/project_user.entity");
const projectCreateService = ({ user_id, name, description, objective, created_at, updated_at, active, }) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const projects = yield projectRepository.find();
    const projectAlreadyExists = projects.find((project) => project.name === name);
    if (projectAlreadyExists) {
        throw new Error("Project already exists");
    }
    const project = new project_entity_1.Project();
    project.name = name;
    project.description = description;
    project.objective = objective;
    project.active = true;
    projectRepository.create(project);
    yield projectRepository.save(project);
    const projectRepositoryRegister = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const projectsNew = yield projectRepositoryRegister.find();
    const createdProject = projectsNew.find((project) => project.name === name);
    const projectUserRepository = data_source_1.AppDataSource.getRepository(project_user_entity_1.Project_User);
    const projectUser = new project_user_entity_1.Project_User();
    projectUser.projects_id = createdProject.id;
    projectUser.users_id = user_id;
    projectUserRepository.create(projectUser);
    yield projectUserRepository.save(projectUser);
    return project;
});
exports.default = projectCreateService;
