import { AppDataSource } from "../../data-source"
import { Project_Posts } from "../../entities/project_posts.entity"
import { IPostUpdate } from "../../interfaces/posts"

const postUpdateService = async({id, title, content}:IPostUpdate)=>{

    const postsRepository = AppDataSource.getRepository(Project_Posts)
    const posts = await postsRepository.find()
    const post = posts.find(post => post.id === id)
  
    await postsRepository.update(post!.id,{title: title, content: content})

    return {
        message:'Post successfully updated', 
        UpdatedInfo:{
            title:title,
            content: content,
        }
    }
}

export default postUpdateService