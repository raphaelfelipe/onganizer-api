import { Follow_Projects } from "../../entities/followed_projects.entity";
import { IFollowCreate } from "../../interfaces/projects";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const followProjectService = async ({ project_id, user_id }: IFollowCreate) => {
    const followsRepository = AppDataSource.getRepository(Follow_Projects)
    const follows = await followsRepository.find({
        relations: ["user", "project"]
    })
    const returnFollow = follows.find(element => element.project_id === project_id)

    console.log("teste", returnFollow)

    if (returnFollow) {
        throw new AppError("is already following this project", 404);
    }

    const follow = new Follow_Projects()
    follow.project_id = project_id
    follow.user_id = user_id

    followsRepository.create(follow)
    await followsRepository.save(follow)

    return follow
}

export default followProjectService