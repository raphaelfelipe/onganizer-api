import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Post_Comments } from "../entities/post_comments.entity";
import { AppError } from "../errors/appError";

export const authCommentOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postCommentsRepository = AppDataSource.getRepository(Post_Comments);

    const { id: commentId } = req.params;

    const postComments = await postCommentsRepository.find();

    const selectedComment = postComments.find(
      (comment) => comment.id === commentId
    );

    if (selectedComment?.user_id !== req.userId) {
      throw new AppError("Unauthorised access", 401)
    }

    next();
  } catch (error) {
    throw new AppError("Unauthorised access", 401)
   }
};
