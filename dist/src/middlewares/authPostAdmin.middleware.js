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
exports.authPostOrAdmin = void 0;
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entities/user.entity");
const project_entity_1 = require("../entities/project.entity");
const project_posts_entity_1 = require("../entities/project_posts.entity");
const appError_1 = require("../errors/appError");
const authPostOrAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        const users = yield repository.find();
        const account = users.find(user => user.id === req.userId);
        if (account === null || account === void 0 ? void 0 : account.is_admin) {
            next();
        }
        const { id: postId } = req.params;
        const postsRepository = data_source_1.AppDataSource.getRepository(project_posts_entity_1.Project_Posts);
        const post = yield postsRepository.findOne({
            where: { id: postId },
            relations: ["project"]
        });
        if (!post) {
            throw new appError_1.AppError("Post not found", 404);
        }
        const projectUserRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
        const project = yield projectUserRepository.findOne({
            where: { id: post.project.id },
            relations: ["users"]
        });
        let selectedUser = false;
        project === null || project === void 0 ? void 0 : project.users.forEach(user => {
            user.id === req.userId ? selectedUser = true : selectedUser = selectedUser;
        });
        if (selectedUser) {
            next();
        }
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorised access"
        });
    }
});
exports.authPostOrAdmin = authPostOrAdmin;
