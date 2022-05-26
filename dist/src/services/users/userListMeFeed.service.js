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
const followed_projects_entity_1 = require("../../entities/followed_projects.entity");
const project_posts_entity_1 = require("../../entities/project_posts.entity");
const userListMeFeedService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const followProjectsRepository = data_source_1.AppDataSource.getRepository(followed_projects_entity_1.Follow_Projects);
    const followProjects = yield followProjectsRepository.find({
        relations: ["user", "project"]
    });
    const follows = followProjects.filter(followProject => followProject.user_id === id);
    const projectsPostsRepository = data_source_1.AppDataSource.getRepository(project_posts_entity_1.Project_Posts);
    const projectsPosts = yield projectsPostsRepository.find({
        relations: ["project"]
    });
    const postFeed = projectsPosts.filter(post => follows.some(project => post.project.id === project.project_id));
    return postFeed;
});
exports.default = userListMeFeedService;
