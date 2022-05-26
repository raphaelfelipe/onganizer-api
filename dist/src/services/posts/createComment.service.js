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
const post_comments_entity_1 = require("../../entities/post_comments.entity");
const project_posts_entity_1 = require("../../entities/project_posts.entity");
const appError_1 = require("../../errors/appError");
const createCommentService = ({ post_id, user_id, comment }) => __awaiter(void 0, void 0, void 0, function* () {
    const postsRepository = data_source_1.AppDataSource.getRepository(post_comments_entity_1.Post_Comments);
    const posts = yield postsRepository.find();
    const post = posts.find(post => post.post_id === post_id);
    const projectPostsRepository = data_source_1.AppDataSource.getRepository(project_posts_entity_1.Project_Posts);
    const projectPosts = yield projectPostsRepository.find();
    const project = projectPosts.find(project => project.id === post_id);
    if (!project) {
        throw new appError_1.AppError("Project not found", 404);
    }
    const commentary = new post_comments_entity_1.Post_Comments();
    commentary.post_id = post_id;
    commentary.user_id = user_id;
    commentary.comment = comment;
    postsRepository.create(commentary);
    yield postsRepository.save(commentary);
    return commentary;
});
exports.default = createCommentService;
