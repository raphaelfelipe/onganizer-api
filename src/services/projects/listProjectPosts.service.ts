import { Project_Posts } from "../../entities/project_posts.entity";
import { AppDataSource } from "../../data-source";
import { IProjectId } from "../../interfaces/projects";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors/appError";


const projectPostsService = async ({ id }: IProjectId) => {
    const projectRepository = AppDataSource.getRepository(Project)
    const projects = await projectRepository.find()
    const project = projects.find((project) => project.id === id)

    if (!project) {
        throw new AppError("Project not found", 404)
    }

    const projectPostsRepository = AppDataSource.getRepository(Project_Posts)
    const projectPosts = await projectPostsRepository.find({ relations: ["project"] })
    const posts = projectPosts.filter((post) => post.project.id === id)

    if (!posts) {
        throw new AppError("Post not found", 404)
    }

    return posts
}

export default projectPostsService