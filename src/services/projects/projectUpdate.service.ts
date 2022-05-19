import { AppDataSource } from "../../data-source"
import { Project } from "../../entities/project.entity"
import { IProjectUpdate } from "../../interfaces/projects"

const projectUpdateService = async({id, active, objective, name, description}:IProjectUpdate)=>{
    const projectRepository = AppDataSource.getRepository(Project)

    const projects = await projectRepository.find()

    const project = projects.find(project=>project.id === id)
  
    await projectRepository.update(project!.id,{name: name, description: description, objective: objective, active:active})

 

    return {message:'User successfully updated'}
}

export default projectUpdateService