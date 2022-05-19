import { Request, Response } from "express";
import commentDeleteService from "../services/posts/commentDelete.service";
import createCommentService from "../services/posts/createComment.service";
import listAllPostCommentariesService from "../services/posts/listAllPostCommentaries.service";
import listAllPostCommentaries from "../services/posts/listAllPostCommentaries.service";
import listCommentByIdService from "../services/posts/listCommentById.service";
import listCommentById from "../services/posts/listCommentById.service";
import listPostService from "../services/posts/listPost.service";
import postCommentUpdateService from "../services/posts/postCommentsUpdate.service";
import postDeleteService from "../services/posts/postDelete.service";

class PostsController {

  async storeCommentary(req: Request, res: Response) {
    try {
      const { post_id } = req.params;
      const { user_id, comment } = req.body;
      const commetary = await createCommentService({
        post_id,
        user_id,
        comment,
      });

      return res.status(201).json(commetary);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  async indexPost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await listPostService(id);

      return res.status(200).json(post);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  async indexCommentary(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await listCommentByIdService(id);

      return res.status(200).json(post);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  async indexAllPostCommentaries(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await listAllPostCommentariesService(id);

      return res.status(200).json(post);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

//   async updatePost (req:Request, res:Response){
//       try{
//           const {id} = req.params
//           const {}
//       }
//   }

  async updateComentary (req:Request, res:Response){
      try{
          const {id}= req.params
          const {comment} = req.body

          const updatedComment = await postCommentUpdateService({id, comment})

          return res.status(200).json(updatedComment)

      }catch(err){
        if (err instanceof Error) {
            return res.status(400).send({
              error: err.name,
              message: err.message,
            });
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
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  async deletePost(req:Request, res:Response){
      try{
          const {id} = req.params

          const deletedPost = postDeleteService({id})

          res.status(200).json({message:"Post successfully deleted"})

      }catch(err){
        if (err instanceof Error) {
            return res.status(400).send({
              error: err.name,
              message: err.message,
            });
          }
      }
  }
}

export default PostsController;
