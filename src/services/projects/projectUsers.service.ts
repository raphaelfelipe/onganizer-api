import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { IProjectId } from "../../interfaces/projects";

const projectUsersService = async ({ id }: IProjectId) => {
    const projectUserRepository = AppDataSource.getRepository(Project)

    return await projectUserRepository.createQueryBuilder('project')
        .leftJoinAndSelect('project.users', 'user')
        .select(["project.id", "project.name", "user.id", "user.name", "user.email", "user.description"])
        .where({ "id": id })
        .getOne()
}

export default projectUsersService