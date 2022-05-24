import { AppDataSource } from "../../data-source"
import { Project } from "../../entities/project.entity"
import { AppError } from "../../errors/appError"
import { IProjectUpdate } from "../../interfaces/projects"

const projectUpdateService = async({id, active, objective, name, description}:IProjectUpdate)=>{
    const projectRepository = AppDataSource.getRepository(Project)

    const projects = await projectRepository.find()

    const project = projects.find(project=>project.id === id)

    if(!project){
        throw new AppError("Project not found", 404)
    }
  
    await projectRepository.update(project!.id,{name: name, description: description, objective: objective, active:active})

 

    return {message:'Project successfully updated', UpdatedInfo:{
        
        name:name,
        description: description,
        objective: objective,
        active:active
    }
    }
}

export default projectUpdateService