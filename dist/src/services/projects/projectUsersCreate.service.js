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
const project_entity_1 = require("../../entities/project.entity");
const user_entity_1 = require("../../entities/user.entity");
const appError_1 = require("../../errors/appError");
const uuidValidator_1 = __importDefault(require("../../utils/uuidValidator"));
const userProjectCreateService = ({ project_id, user_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, uuidValidator_1.default)(user_id)) {
        throw new appError_1.AppError("id not valid", 422);
    }
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const project = yield projectRepository.findOne({
        where: { id: project_id },
        relations: ["users"],
    });
    if (!project) {
        throw new appError_1.AppError("Project not found", 404);
    }
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const user = yield userRepository.findOne({
        where: { id: user_id },
    });
    if (!user) {
        throw new appError_1.AppError("User not found", 404);
    }
    if (project.users.some(user => user.id === user_id)) {
        throw new appError_1.AppError("user is already a project administrator", 409);
    }
    project.users.push(user);
    yield projectRepository.save(project);
    return yield projectRepository
        .createQueryBuilder("project")
        .leftJoinAndSelect("project.users", "user")
        .select([
        "project",
        "user.id",
        "user.name",
        "user.email",
        "user.description",
    ])
        .where({ id: project_id })
        .getOne();
});
exports.default = userProjectCreateService;
