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
const project_posts_entity_1 = require("../../entities/project_posts.entity");
const data_source_1 = require("../../data-source");
const project_entity_1 = require("../../entities/project.entity");
const appError_1 = require("../../errors/appError");
const projectPostsService = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const projects = yield projectRepository.find();
    const project = projects.find((project) => project.id === id);
    if (!project) {
        throw new appError_1.AppError("Project not found", 404);
    }
    const projectPostsRepository = data_source_1.AppDataSource.getRepository(project_posts_entity_1.Project_Posts);
    const projectPosts = yield projectPostsRepository.find({ relations: ["project"] });
    const posts = projectPosts.filter((post) => post.project.id === id);
    if (!posts) {
        throw new appError_1.AppError("Post not found", 404);
    }
    return posts;
});
exports.default = projectPostsService;
