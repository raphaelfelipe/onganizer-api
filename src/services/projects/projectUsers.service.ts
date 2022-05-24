import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IProjectId } from "../../interfaces/projects";

const projectUsersService = async ({ id }: IProjectId) => {
    // const projectUserRepository = AppDataSource.getRepository(User)

    // const projectUsers = await projectUserRepository.find()

    // const projectUsersId = projectUsers.filter((project)=>project.projects_id === id)

    // return projectUsersId
}

export default projectUsersService