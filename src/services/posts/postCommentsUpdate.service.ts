import { AppDataSource } from "../../data-source"
import { Post_Comments } from "../../entities/post_comments.entity"
import { AppError } from "../../errors/appError"
import { IPostComment } from "../../interfaces/posts"

const postCommentUpdateService = async ({ id, comment }: IPostComment) => {

    const postsCommentRepository = AppDataSource.getRepository(Post_Comments)
    const postComments = await postsCommentRepository.find()
    const comments = postComments.find(comment => comment.id === id)

    if (!comments) {
        throw new AppError("Post not found", 404);
    }

    await postsCommentRepository.update(comments!.id, { comment: comment })

    return {
        message: 'Comment successfully updated',
        UpdatedInfo: {
            comment: comment,
        }
    }
}

export default postCommentUpdateService