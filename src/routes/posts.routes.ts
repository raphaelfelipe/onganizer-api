import { Router } from "express";
import PostsController from "../controllers/posts.controller";
import { authCommentOrAdmin } from "../middlewares/authCommentAdmin.middleware";
// import { authProject } from "../middlewares/authProject.middleware";
import { authToken } from "../middlewares/authToken.middleware";

const postRoutes = Router()

const postController = new PostsController()

postRoutes.get("/:id", postController.indexPost)
postRoutes.get("/:id/comments", postController.indexAllPostCommentaries)
postRoutes.get("/comments/:id", postController.indexCommentary)
postRoutes.use(authToken)
postRoutes.post("/:id/comments", postController.storeCommentary)
postRoutes.patch("/comments/:id", authCommentOrAdmin, postController.updateComentary)
postRoutes.delete("/comments/:id", authCommentOrAdmin, postController.deleteCommentary)
postRoutes.patch("/:id", /*authProject*/ postController.updatePost)
postRoutes.delete("/:id", /*authProject*/ postController.deletePost)


export default postRoutes