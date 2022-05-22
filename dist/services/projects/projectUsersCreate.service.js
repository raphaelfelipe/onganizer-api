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
const project_user_entity_1 = require("../../entities/project_user.entity");
const data_source_1 = require("../../data-source");
const userProjectCreateService = ({ project_id, user_id }) => __awaiter(void 0, void 0, void 0, function* () {
    const projectUsersRepository = data_source_1.AppDataSource.getRepository(project_user_entity_1.Project_User);
    const projectUsers = yield projectUsersRepository.find();
    const projectUser = new project_user_entity_1.Project_User();
    projectUser.projects_id = project_id;
    projectUser.users_id = user_id;
    projectUsersRepository.create(projectUser);
    yield projectUsersRepository.save(projectUser);
    return projectUser;
});
exports.default = userProjectCreateService;
