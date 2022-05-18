import { Project } from "../../entities/project.entity";
import {AppDataSource} from "../../data-source"
import {IProjectId} from "../../interfaces/projects"

const projectListOneService = async ({id}: IProjectId) => {
    const projectRepository = AppDataSource.getRepository(Project)

    const projects = await projectRepository.find()

    const project = projects.find((project)=>project.id === id)

    return project
}

export default projectListOneService