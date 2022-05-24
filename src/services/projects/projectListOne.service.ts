import { Project } from "../../entities/project.entity";
import {AppDataSource} from "../../data-source"
import {IProjectId} from "../../interfaces/projects"
import { AppError } from "../../errors/appError";

const projectListOneService = async ({id}: IProjectId) => {
    const projectRepository = AppDataSource.getRepository(Project)

    const projects = await projectRepository.find()

    const project = projects.find((project)=>project.id === id)

    if(!project){
        throw new AppError("Project not found", 404)
    }

    return project
}

export default projectListOneService