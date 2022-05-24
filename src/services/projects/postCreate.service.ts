import { IPostCreate } from "../../interfaces/posts";
import { AppDataSource } from "../../data-source";
import { Project_Posts } from "../../entities/project_posts.entity";
import { Project } from "../../entities/project.entity";

const postCreateService = async ({ project_id, title, content }: IPostCreate) => {
    const postsRepository = AppDataSource.getRepository(Project_Posts)
    const projectRepository = AppDataSource.getRepository(Project)
    const project = await projectRepository.find({
        where: { id: project_id }
    })

    console.log(project_id, project)

    const post = new Project_Posts()
    post.title = title
    post.content = content

    post.project = project[0]


    postsRepository.create(post)
    await postsRepository.save(post)

    return post
}

export default postCreateService
