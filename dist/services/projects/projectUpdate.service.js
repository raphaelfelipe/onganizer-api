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
const projectUpdateService = ({ id, active, objective, name, description }) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const projects = yield projectRepository.find();
    const project = projects.find(project => project.id === id);
    yield projectRepository.update(project.id, { name: name, description: description, objective: objective, active: active });
    return { message: 'Project successfully updated', UpdatedInfo: {
            name: name,
            description: description,
            objective: objective,
            active: active
        }
    };
});
exports.default = projectUpdateService;
