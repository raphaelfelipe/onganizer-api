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
                const { post_id } = req.params;
                const { comment } = req.body;
                const user_id = req.userId;
                const commetary = yield (0, createComment_service_1.default)({
                    post_id,
                    user_id,
                    comment,
                });
                return res.status(201).json(commetary);
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
    indexPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield (0, listPost_service_1.default)(id);
                return res.status(200).json(post);
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
    indexCommentary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield (0, listCommentById_service_1.default)(id);
                return res.status(200).json(post);
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
    indexAllPostCommentaries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield (0, listAllPostCommentaries_service_1.default)(id);
                return res.status(200).json(post);
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
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, content } = req.body;
                const updatedPost = yield (0, postUpdate_service_1.default)({ id, title, content });
                res.status(200).json(updatedPost);
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
    updateComentary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { comment } = req.body;
                const updatedComment = yield (0, postCommentsUpdate_service_1.default)({ id, comment });
                return res.status(200).json(updatedComment);
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
    deleteCommentary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedComment = yield (0, commentDelete_service_1.default)({ id });
                return res
                    .status(200)
                    .json({ message: "Commentary deleted successfully" });
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
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedPost = (0, postDelete_service_1.default)({ id });
                res.status(200).json({ message: "Post successfully deleted" });
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
exports.default = PostsController;
