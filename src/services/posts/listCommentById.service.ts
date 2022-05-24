import { AppDataSource } from "../../data-source"
import { Post_Comments } from "../../entities/post_comments.entity"
import { AppError } from "../../errors/appError"

const listCommentByIdService = async(id:string)=>{
    const repository = AppDataSource.getRepository(Post_Comments)

    const comments = await repository.find()

    const commentary = comments.find(commentary=>commentary.id === id)

    if(!commentary){
        throw new AppError("Commentary not found", 404)

    }

    return  commentary
}

export default listCommentByIdService