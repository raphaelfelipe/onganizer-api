import { AppDataSource } from "../../data-source"
import { IFollowCreate } from "../../interfaces/projects";
import { Follow_Projects } from "../../entities/followed_projects.entity";
import { AppError } from "../../errors/appError";
import { Project } from "../../entities/project.entity";

const deleteFollowService = async ({ project_id, user_id }: IFollowCreate) => {
    const followRepository = AppDataSource.getRepository(Follow_Projects)
    const follows = await followRepository.find({
        relations: ["user", "project"]
    })
    const follow = follows.find(follow => follow.project_id === project_id && follow.user_id === user_id)

    const projectRepository = AppDataSource.getRepository(Project)
    const projects = await projectRepository.find()
    const returnproject = projects.find(element => element.id === project_id)

    if (!returnproject) {
        throw new AppError("Project not found", 404);
    }

    if (!follow) {
        throw new AppError("Post not found", 404)
    }

    await followRepository.delete(follow!.id)

    return true
}

export default deleteFollowService