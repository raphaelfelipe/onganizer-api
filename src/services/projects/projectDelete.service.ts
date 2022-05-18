import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";

const projectDeleteSelfService = async (id: string) => {
  const projectRepository = AppDataSource.getRepository(Project);

  const projects = await projectRepository.find();

  const projectDeleted = projects.find((project) => project.id === id);

  await projectRepository.delete(projectDeleted!.id);

  return true;
};

export default projectDeleteSelfService;
