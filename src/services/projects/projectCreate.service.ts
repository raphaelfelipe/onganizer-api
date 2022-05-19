import { Project } from "../../entities/project.entity";
import { IProjectCreate } from "../../interfaces/projects";
import { AppDataSource } from "../../data-source";

const projectCreateService = async ({
  name,
  description,
  objective,
  created_at,
  updated_at,
  active,
}: IProjectCreate) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const projects = await projectRepository.find();
  const projectAlreadyExists = projects.find(
    (project) => project.name === name
  );
  if (projectAlreadyExists) {
    throw new Error("Project already exists");
  }
  const project = new Project();
  project.name = name;
  project.description = description;
  project.objective = objective;
  project.active = true;

  projectRepository.create(project);
  await projectRepository.save(project);
  return project;
};

export default projectCreateService;
