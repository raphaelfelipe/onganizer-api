import { IFollowCreate } from "../../interfaces/projects";
import { Project_User } from "../../entities/project_user.entity";
import { AppDataSource } from "../../data-source";

const userProjectCreateService = async ({ project_id, user_id }: IFollowCreate) => {

    const projectUsersRepository = AppDataSource.getRepository(Project_User)

    const projectUser = new Project_User()
    projectUser.projects_id = project_id
    projectUser.users_id = user_id

    projectUsersRepository.create(projectUser)
    await projectUsersRepository.save(projectUser)

    return projectUser
}

export default userProjectCreateService