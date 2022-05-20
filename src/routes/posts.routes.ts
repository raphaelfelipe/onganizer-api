import { Router } from "express";
import PostsController from "../controllers/posts.controller";
import { authCommentOrAdmin } from "../middlewares/authCommentAdmin.middleware";
import { authProject } from "../middlewares/authProject.middleware";
import { authToken } from "../middlewares/authToken.middleware";

const postRoutes = Router()

const postController = new PostsController()

postRoutes.post("/:id/comments", authToken, postController.storeCommentary)
postRoutes.get("/:id", postController.indexPost)
postRoutes.get("/:id/comments", postController.indexAllPostCommentaries)
postRoutes.get("/comments/:id", postController.indexCommentary)
postRoutes.patch("/comments/:id", authToken, authCommentOrAdmin, postController.updateComentary)
postRoutes.patch("/:id", authToken, authProject, postController.updatePost)
postRoutes.delete("/:id", authToken, authProject, postController.deletePost)
postRoutes.delete("/comments/:id", authToken, authCommentOrAdmin, postController.deleteCommentary)


export default postRoutes