import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Post_Comments } from "../entities/post_comments.entity"
import { User } from "../entities/user.entity"

export const authCommentOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const repository = AppDataSource.getRepository(User)
        const users = await repository.find()
        const account = users.find(user => user.id === req.userId)

        if(account?.is_admin){
            next()
        }

        const postCommentsRepository = AppDataSource.getRepository(Post_Comments);
        const { id: commentId } = req.params;
        const postComments = await postCommentsRepository.find();
        const selectedComment = postComments.find((comment) => comment.id === commentId);

        if (selectedComment?.user_id === req.userId) {
            next();
        }else{
            throw new Error();
        }


    }catch(err){
        return res.status(401).json({
            message: "Unauthorised access"
        })
    }
}