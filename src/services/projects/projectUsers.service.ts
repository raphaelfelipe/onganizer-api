import { Project_User } from "../../entities/project_user.entity";
import { AppDataSource } from "../../data-source";
import { IProjectId } from "../../interfaces/projects";

const projectUsersService = async ({id} : IProjectId) => {
    const projectUserRepository = AppDataSource.getRepository(Project_User)

    const projectUsers = await projectUserRepository.find()

    const projectUsersId = projectUsers.filter((project)=>project.projects_id === id)

    return projectUsersId
}

export default projectUsersService