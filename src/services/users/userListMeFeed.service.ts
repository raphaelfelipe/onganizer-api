import { AppDataSource } from "../../data-source";
import {Follow_Projects} from "../../entities/followed_projects.entity"
import {Project_Posts} from "../../entities/project_posts.entity"

const userListMeFeedService = async (id: string) => {

    const followProjectsRepository = AppDataSource.getRepository(Follow_Projects)
    const followProjects = await followProjectsRepository.find()
    const follows = followProjects.filter(followProject => followProject.user_id === id)
    
    const projectsPostsRepository = AppDataSource.getRepository(Project_Posts)
    const projectsPosts = await projectsPostsRepository.find()

    let feed: Project_Posts[][] = []
    follows.forEach(follow => {
        feed.push(projectsPosts.filter(post => post.project === follow.project))
    });

    return feed
}

export default userListMeFeedService