import { IFollowCreate } from "../../interfaces/projects";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { User } from "../../entities/user.entity";

const userProjectCreateService = async ({ project_id, user_id }: IFollowCreate) => {

    const projectRepository = AppDataSource.getRepository(Project)
    const project = await projectRepository.findOne({
        where: { id: project_id },
        relations: ["users"]
    });

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where: { id: user_id }
    })

    project!.users.push(user!)

    console.log([...project!.users, user!])
    await projectRepository.save(project!)


    return await projectRepository.createQueryBuilder('project')
    .leftJoinAndSelect('project.users', 'user')
    .select(["project","user.name", "user.email", "user.description"])
    .where({"id":project_id})
    .getOne()

    
}

export default userProjectCreateService