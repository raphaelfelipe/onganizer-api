import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import commentDeleteService from "../services/posts/commentDelete.service";
import createCommentService from "../services/posts/createComment.service";
import listAllPostCommentariesService from "../services/posts/listAllPostCommentaries.service";
import listCommentByIdService from "../services/posts/listCommentById.service";
import listPostService from "../services/posts/listPost.service";
import postCommentUpdateService from "../services/posts/postCommentsUpdate.service";
import postDeleteService from "../services/posts/postDelete.service";
import postUpdateService from "../services/posts/postUpdate.service";

class PostsController {
  async storeCommentary(req: Request, res: Response) {
    try {
      const { post_id } = req.params;
      const { comment } = req.body;
      const user_id = req.userId;
      const commetary = await createCommentService({
        post_id,
        user_id,
        comment,
      });

      return res.status(201).json(commetary);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async indexPost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await listPostService(id);

      return res.status(200).json(post);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async indexCommentary(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await listCommentByIdService(id);

      return res.status(200).json(post);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async indexAllPostCommentaries(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await listAllPostCommentariesService(id);

      return res.status(200).json(post);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const updatedPost = await postUpdateService({ id, title, content });

      res.status(200).json(updatedPost);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async updateComentary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { comment } = req.body;

      const updatedComment = await postCommentUpdateService({ id, comment });

      return res.status(200).json(updatedComment);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async deleteCommentary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedComment = await commentDeleteService({ id });

      return res
        .status(200)
        .json({ message: "Commentary deleted successfully" });
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedPost = postDeleteService({ id });

      res.status(200).json({ message: "Post successfully deleted" });
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
}

export default PostsController;
