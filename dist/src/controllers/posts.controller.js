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
const commentDelete_service_1 = __importDefault(require("../services/posts/commentDelete.service"));
const createComment_service_1 = __importDefault(require("../services/posts/createComment.service"));
const listAllPostCommentaries_service_1 = __importDefault(require("../services/posts/listAllPostCommentaries.service"));
const listCommentById_service_1 = __importDefault(require("../services/posts/listCommentById.service"));
const listPost_service_1 = __importDefault(require("../services/posts/listPost.service"));
const postCommentsUpdate_service_1 = __importDefault(require("../services/posts/postCommentsUpdate.service"));
const postDelete_service_1 = __importDefault(require("../services/posts/postDelete.service"));
const postUpdate_service_1 = __importDefault(require("../services/posts/postUpdate.service"));
class PostsController {
    storeCommentary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: post_id } = req.params;
                const { comment } = req.body;
                const user_id = req.userId;
                const commetary = yield (0, createComment_service_1.default)({
                    post_id,
                    user_id,
                    comment,
                });
                return res.status(201).json(commetary);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    indexPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield (0, listPost_service_1.default)(id);
                return res.status(200).json(post);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    indexCommentary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield (0, listCommentById_service_1.default)(id);
                return res.status(200).json(post);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    indexAllPostCommentaries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield (0, listAllPostCommentaries_service_1.default)(id);
                return res.status(200).json(post);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, content } = req.body;
                const updatedPost = yield (0, postUpdate_service_1.default)({ id, title, content });
                res.status(200).json(updatedPost);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    updateComentary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { comment } = req.body;
                const updatedComment = yield (0, postCommentsUpdate_service_1.default)({ id, comment });
                return res.status(200).json(updatedComment);
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    deleteCommentary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedComment = yield (0, commentDelete_service_1.default)({ id });
                return res
                    .status(200)
                    .json({ message: "Commentary deleted successfully" });
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedPost = (0, postDelete_service_1.default)({ id });
                res.status(200).json({ message: "Post successfully deleted" });
            }
            catch (error) {
                if (error instanceof appError_1.AppError) {
                    (0, appError_1.handleError)(error, res);
                }
            }
        });
    }
}
exports.default = PostsController;
