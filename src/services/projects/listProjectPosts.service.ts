import { Project_Posts } from "../../entities/project_posts.entity";
import { AppDataSource } from "../../data-source";
import { IProjectId } from "../../interfaces/projects";

const projectPostsService = async ({id} : IProjectId) => {
    const projectPostsRepository = AppDataSource.getRepository(Project_Posts)

    const projectPosts = await projectPostsRepository.find()

    const posts = projectPosts.filter((post)=>post.project_id === id)

    return posts
}

export default projectPostsService