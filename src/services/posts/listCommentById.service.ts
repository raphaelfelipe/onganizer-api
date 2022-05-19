import { AppDataSource } from "../../data-source"
import { Post_Comments } from "../../entities/post_comments.entity"

const listCommentById = async(id:string)=>{
    const repository = AppDataSource.getRepository(Post_Comments)

    const comments = await repository.find()

    const commentary = comments.find(commentary=>commentary.id === id)

    if(!commentary){
        throw new Error("Commentary not found")

    }

    return  commentary
}

export default listCommentById