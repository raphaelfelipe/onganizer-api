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
const project_posts_entity_1 = require("../../entities/project_posts.entity");
const project_entity_1 = require("../../entities/project.entity");
const postCreateService = ({ project_id, title, content }) => __awaiter(void 0, void 0, void 0, function* () {
    const postsRepository = data_source_1.AppDataSource.getRepository(project_posts_entity_1.Project_Posts);
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const project = yield projectRepository.find({
        where: { id: project_id }
    });
    const post = new project_posts_entity_1.Project_Posts();
    post.title = title;
    post.content = content;
    post.project = project[0];
    postsRepository.create(post);
    yield postsRepository.save(post);
    return post;
});
exports.default = postCreateService;
