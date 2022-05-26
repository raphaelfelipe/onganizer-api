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

postRoutes.use(authPostOrAdmin);
postRoutes.patch("/:id", authUUID, postController.updatePost);
postRoutes.delete("/:id", authUUID, postController.deletePost);

export default postRoutes;
