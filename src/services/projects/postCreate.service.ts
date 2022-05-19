import { IPostCreate } from "../../interfaces/posts";
import { AppDataSource } from "../../data-source";
import { Project_Posts } from "../../entities/project_posts.entity";

const postCreateService = async ({project_id, title, content}:IPostCreate) =>{
    const postsRepository = AppDataSource.getRepository(Project_Posts)
    const posts = await postsRepository.find()

    const post = new Project_Posts()
    post.project_id = project_id
    post.title = title
    post.content = content
    post.created_at = new Date()
    post.updated_at = new Date()

    postsRepository.create(post)
    await postsRepository.save(post)

    return post
}

export default postCreateService
