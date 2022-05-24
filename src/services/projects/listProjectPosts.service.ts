import { Project_Posts } from "../../entities/project_posts.entity";
import { AppDataSource } from "../../data-source";
import { IProjectId } from "../../interfaces/projects";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors/appError";


const projectPostsService = async ({id} : IProjectId) => {
    const projectPostsRepository = AppDataSource.getRepository(Project_Posts)


    const projectPosts = await projectPostsRepository.find()

    const posts = projectPosts.filter((post)=>post.project_id === id)
    
    if(!posts){
        throw new AppError("Post not found", 404)
    }


    return posts
}

export default projectPostsService