import { AppDataSource } from "../../data-source"
import { IFollowCreate } from "../../interfaces/projects";
import { Follow_Projects } from "../../entities/followed_projects.entity";

const deleteFollowService = async({project_id, user_id}: IFollowCreate)=>{
    const followRepository = AppDataSource.getRepository(Follow_Projects)

    const follows = await followRepository.find()

    const follow = follows.find(follow=>follow.project_id === project_id && follow.user_id === user_id)

    await followRepository.delete(follow!.id)

    return true
}

export default deleteFollowService