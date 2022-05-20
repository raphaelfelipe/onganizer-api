import { Router } from "express";
import PostsController from "../controllers/posts.controller";

const postRoutes = Router()

const postController = new PostsController()

postRoutes.post("/:id/comments", postController.storeCommentary)
postRoutes.get("/:id", postController.indexPost)
postRoutes.get("/:id/comments", postController.indexAllPostCommentaries)
postRoutes.get("/comments/:id", postController.indexCommentary)
postRoutes.patch("/comments/:id", postController.updateComentary)
postRoutes.patch("/:id", postController.updatePost)
postRoutes.delete("/:id", postController.deletePost)
postRoutes.delete("/comments/:id", postController.deleteCommentary)


export default postRoutes