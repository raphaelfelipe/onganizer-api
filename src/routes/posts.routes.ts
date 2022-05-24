import { Router } from "express";
import PostsController from "../controllers/posts.controller";
//import { authCommentOrAdmin } from "../middlewares/authCommentAdmin.middleware";
import { authPostOrAdmin } from "../middlewares/authPostAdmin.middleware";
import { authToken } from "../middlewares/authToken.middleware";

const postRoutes = Router()

const postController = new PostsController()

postRoutes.get("/:id", postController.indexPost)
postRoutes.get("/:id/comments", postController.indexAllPostCommentaries)
postRoutes.get("/comments/:id", postController.indexCommentary)

postRoutes.use(authToken)
postRoutes.post("/:id/comments", postController.storeCommentary)
postRoutes.patch("/comments/:id", postController.updateComentary)
postRoutes.delete("/comments/:id", postController.deleteCommentary)
postRoutes.use(authPostOrAdmin)
postRoutes.patch("/:id", postController.updatePost)
postRoutes.delete("/:id", postController.deletePost)


export default postRoutes