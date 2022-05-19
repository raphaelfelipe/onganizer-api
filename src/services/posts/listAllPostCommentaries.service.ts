import { AppDataSource } from "../../data-source"
import { Post_Comments } from "../../entities/post_comments.entity"

const listAllPostCommentaries = async(id:string)=>{

    const repository = AppDataSource.getRepository(Post_Comments)

    const posts = await repository.find()

    const postCommentaries = posts.find(post => post.post_id === id)
     
    if(!postCommentaries){
        throw new Error ("Post not found")
    }

   return postCommentaries

}

export default listAllPostCommentaries