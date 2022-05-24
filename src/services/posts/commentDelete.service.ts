import { AppDataSource } from "../../data-source";
import { Post_Comments } from "../../entities/post_comments.entity";
import { AppError } from "../../errors/appError";
import { ICommentId } from "../../interfaces/posts";

const commentDeleteService = async ({id}: ICommentId) => {
  const commentRepository = AppDataSource.getRepository(Post_Comments);

  const comments = await commentRepository.find();

  const commentDeleted = comments.find((comment) => comment.id === id);
  
  if(!commentDeleted){
    throw new AppError("Commentary not found", 404)
  }

  await commentRepository.delete(commentDeleted!.id);

  return true;
};

export default commentDeleteService;
