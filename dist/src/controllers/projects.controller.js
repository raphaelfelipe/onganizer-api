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
const appError_1 = require("../errors/appError");
const followProject_service_1 = __importDefault(require("../services/projects/followProject.service"));
const followProjectDelete_service_1 = __importDefault(require("../services/projects/followProjectDelete.service"));
const listProjectPosts_service_1 = __importDefault(require("../services/projects/listProjectPosts.service"));
const postCreate_service_1 = __importDefault(require("../services/projects/postCreate.service"));
const projectCreate_service_1 = __importDefault(require("../services/projects/projectCreate.service"));
const projectDelete_service_1 = __importDefault(require("../services/projects/projectDelete.service"));
const projectList_service_1 = __importDefault(require("../services/projects/projectList.service"));
const projectListOne_service_1 = __importDefault(require("../services/projects/projectListOne.service"));
const projectUpdate_service_1 = __importDefault(require("../services/projects/projectUpdate.service"));
const projectUsers_service_1 = __importDefault(require("../services/projects/projectUsers.service"));
const projectUsersCreate_service_1 = __importDefault(require("../services/projects/projectUsersCreate.service"));
class ProjectsController {
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.userId;
                const { name, description, objective, active } = req.body;
                const newProject = yield (0, projectCreate_service_1.default)({
                    user_id,
                    name,
                    description,
                    objective,
                });
                return res.status(201).send(newProject);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: project_id } = req.params;
                const { title, content } = req.body;
                const newPost = yield (0, postCreate_service_1.default)({
                    project_id,
                    title,
                    content,
                });
                return res.status(201).send(newPost);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    createProjectUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.body;
                const { id: project_id } = req.params;
                const newProjectUsers = yield (0, projectUsersCreate_service_1.default)({
                    project_id,
                    user_id,
                });
                return res.status(201).send(newProjectUsers);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    createFollowProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.userId;
                const { id: project_id } = req.params;
                const newFollowProject = yield (0, followProject_service_1.default)({
                    project_id,
                    user_id,
                });
                return res.status(201).send(newFollowProject);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    projectList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield (0, projectList_service_1.default)();
                return res.send(projects);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    projectListOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield (0, projectListOne_service_1.default)({ id });
                return res.status(200).send(project);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    listProjectUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const projectUsers = yield (0, projectUsers_service_1.default)({ id });
                return res.status(200).send(projectUsers);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    listProjectPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const projectPosts = yield (0, listProjectPosts_service_1.default)({ id });
                return res.status(200).send(projectPosts);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    projectUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { active, objective, name, description } = req.body;
                const project = yield (0, projectUpdate_service_1.default)({
                    id,
                    active,
                    objective,
                    name,
                    description,
                });
                return res.status(201).send({
                    message: "Project updated",
                    project,
                });
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    projectDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield (0, projectDelete_service_1.default)(id);
                return res.status(200).json({ message: "Project deleted with success" });
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    followProjectDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.userId;
                const { id: project_id } = req.params;
                const followProject = yield (0, followProjectDelete_service_1.default)({ project_id, user_id });
                return res.status(200).json({ message: "Project unfollowed" });
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
}
exports.default = ProjectsController;
