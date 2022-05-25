import { AppDataSource } from "../../data-source";
import { Follow_Projects } from "../../entities/followed_projects.entity"
import { Project } from "../../entities/project.entity";
import { Project_Posts } from "../../entities/project_posts.entity"

const userListMeFeedService = async (id: string) => {

    const followProjectsRepository = AppDataSource.getRepository(Follow_Projects)
    const followProjects = await followProjectsRepository.find({
        relations: ["user", "project"]
    })
    const follows = followProjects.filter(followProject =>
        followProject.user_id === id
    )

    const projectsPostsRepository = AppDataSource.getRepository(Project_Posts)
    const projectsPosts = await projectsPostsRepository.find({
        relations: ["project"]
    })

    const postFeed = projectsPosts.filter(post =>
        follows.some(project => post.project.id === project.project_id)
    )

    return postFeed
}

export default userListMeFeedService