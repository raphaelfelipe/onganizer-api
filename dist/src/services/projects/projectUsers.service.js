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
const project_entity_1 = require("../../entities/project.entity");
const appError_1 = require("../../errors/appError");
const projectUsersService = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const projectUserRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const projects = yield projectUserRepository.find();
    const projectFound = projects.find((project) => project.id === id);
    if (!projectFound) {
        throw new appError_1.AppError("Project not found", 404);
    }
    return yield projectUserRepository
        .createQueryBuilder("project")
        .leftJoinAndSelect("project.users", "user")
        .select([
        "project.id",
        "project.name",
        "user.id",
        "user.name",
        "user.email",
        "user.description",
    ])
        .where({ id: id })
        .getOne();
});
exports.default = projectUsersService;
