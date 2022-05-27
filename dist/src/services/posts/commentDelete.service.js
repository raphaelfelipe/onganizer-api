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
const appError_1 = require("../../errors/appError");
const commentDeleteService = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const commentRepository = data_source_1.AppDataSource.getRepository(post_comments_entity_1.Post_Comments);
    const comments = yield commentRepository.find();
    const commentDeleted = comments.find((comment) => comment.id === id);
    if (!commentDeleted) {
        throw new appError_1.AppError("Commentary not found", 404);
    }
    yield commentRepository.delete(commentDeleted.id);
    return true;
});
exports.default = commentDeleteService;
