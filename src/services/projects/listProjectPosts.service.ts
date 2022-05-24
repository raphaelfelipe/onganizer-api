import { Project_Posts } from "../../entities/project_posts.entity";
import { AppDataSource } from "../../data-source";
import { IProjectId } from "../../interfaces/projects";
import { Project } from "../../entities/project.entity";

const projectPostsService = async ({id} : IProjectId) => {
    const projectPostsRepository = AppDataSource.getRepository(Project_Posts)

    const projectPosts = await projectPostsRepository.find({relations:["project"]})
    console.log(id,projectPosts)
    const posts = projectPosts.filter((post)=>post.project.id === id)

    return posts
}

export default projectPostsService