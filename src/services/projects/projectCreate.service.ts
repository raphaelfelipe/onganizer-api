import { Project } from "../../entities/project.entity";
import { IProjectCreate } from "../../interfaces/projects";
import { AppDataSource } from "../../data-source";
import { Project_User } from "../../entities/project_user.entity";

const projectCreateService = async ({
  user_id,
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

  const projectRepositoryRegister = AppDataSource.getRepository(Project);
  const projectsNew = await projectRepositoryRegister.find();
  const createdProject = projectsNew.find((project) => project.name === name);

  const projectUserRepository = AppDataSource.getRepository(Project_User);

  const projectUser = new Project_User();
  projectUser.projects_id = createdProject!.id;
  projectUser.users_id = user_id;

  projectUserRepository.create(projectUser);
  await projectUserRepository.save(projectUser);

  return project;
};

export default projectCreateService;
