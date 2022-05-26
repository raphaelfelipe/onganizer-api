import { Router } from "express";
import PostsController from "../controllers/posts.controller";
import { authPostOrAdmin } from "../middlewares/authPostAdmin.middleware";
import { authToken } from "../middlewares/authToken.middleware";
import { authUUID } from "../middlewares/authUUID.middleware";

const postRoutes = Router();

const postController = new PostsController();

postRoutes.get("/:id", authUUID, postController.indexPost);
postRoutes.get(
  "/:id/comments",
  authUUID,
  postController.indexAllPostCommentaries
);
postRoutes.get("/comments/:id", authUUID, postController.indexCommentary);

postRoutes.use(authToken);
postRoutes.post("/:id/comments", authUUID, postController.storeCommentary);
postRoutes.patch("/comments/:id", authUUID, postController.updateComentary);
postRoutes.delete("/comments/:id", authUUID, postController.deleteCommentary);

<<<<<<< HEAD
postRoutes.use(authPostOrAdmin);
postRoutes.patch("/:id", authUUID, postController.updatePost);
postRoutes.delete("/:id", authUUID, postController.deletePost);
=======
postRoutes.patch("/:id", authUUID,authPostOrAdmin, postController.updatePost)
postRoutes.delete("/:id", authUUID,authPostOrAdmin, postController.deletePost)
>>>>>>> e7b0f843b9e23217dbe90f90f88d775d9b4d94ba

export default postRoutes;
