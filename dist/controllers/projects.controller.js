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
                const newProject = (0, projectCreate_service_1.default)({
                    user_id,
                    name,
                    description,
                    objective,
                    created_at: new Date(),
                    updated_at: new Date(),
                    active,
                });
                return res.status(201).send(newProject);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { project_id } = req.params;
                const { title, content } = req.body;
                const newPost = (0, postCreate_service_1.default)({
                    project_id,
                    title,
                    content,
                    // created_at: new Date(),
                    // updated_at: new Date(),
                });
                return res.status(201).send(newPost);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
    createProjectUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.userId;
                const { project_id } = req.params;
                const newProjectUsers = (0, projectUsersCreate_service_1.default)({ project_id, user_id });
                return res.status(201).send(newProjectUsers);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
    createFollowProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.userId;
                const { project_id } = req.params;
                const newFollowProject = (0, followProject_service_1.default)({ project_id, user_id });
                return res.status(201).send(newFollowProject);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
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
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
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
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
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
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
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
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
    projectUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { active, objective, name, description } = req.body;
                const project = yield (0, projectUpdate_service_1.default)({ id, active, objective, name, description });
                return res.status(201).send({
                    message: "Project updated!",
                    project
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
    projectDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield (0, projectDelete_service_1.default)(id);
                return res.status(200).json({ message: "Project deleted with succes!" });
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
    followProjectDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.userId;
                const { project_id } = req.params;
                const followProject = yield (0, followProjectDelete_service_1.default)({ project_id, user_id });
                return res.status(200).json({ message: "Follow project deleted with succes!" });
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
}
exports.default = ProjectsController;
