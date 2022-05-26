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
const followed_projects_entity_1 = require("../../entities/followed_projects.entity");
const data_source_1 = require("../../data-source");
const followProjectService = ({ project_id, user_id }) => __awaiter(void 0, void 0, void 0, function* () {
    const followsRepository = data_source_1.AppDataSource.getRepository(followed_projects_entity_1.Follow_Projects);
    const follows = yield followsRepository.find();
    const follow = new followed_projects_entity_1.Follow_Projects();
    follow.project_id = project_id;
    follow.user_id = user_id;
    followsRepository.create(follow);
    yield followsRepository.save(follow);
    return follow;
});
exports.default = followProjectService;
