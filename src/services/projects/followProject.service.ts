import { Follow_Projects } from "../../entities/followed_projects.entity";
import { IFollowCreate } from "../../interfaces/projects";
import { AppDataSource } from "../../data-source";

const followProjectService = async ({project_id, user_id}: IFollowCreate) =>{
    const followsRepository = AppDataSource.getRepository(Follow_Projects)
    const follows = await followsRepository.find()

    const follow = new Follow_Projects()
    follow.project_id = project_id
    follow.user_id = user_id
    follow.created_at = new Date()
    
    followsRepository.create(follow)
    await followsRepository.save(follow)

    return follow
}

export default followProjectService