import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";

const projectListService = async () => {
  const projectRepository = AppDataSource.getRepository(Project);

  const project = projectRepository.find();

  return project;
};

export default projectListService;
