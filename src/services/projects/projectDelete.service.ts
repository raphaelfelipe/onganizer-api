import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors/appError";

const projectDeleteSelfService = async (id: string) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const projects = await projectRepository.find();
  const projectDeleted = projects.find((project) => project.id === id);

  if (!projectDeleted) {
    throw new AppError("Project not found", 404)
  }

  await projectRepository.delete(projectDeleted!.id);


  return true;
};

export default projectDeleteSelfService;
