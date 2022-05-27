import { Project } from "../../entities/project.entity";
import { IProjectCreate } from "../../interfaces/projects";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const projectCreateService = async ({
  user_id,
  name,
  description,
  objective,
}: IProjectCreate) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const projects = await projectRepository.find();
  const projectAlreadyExists = projects.find(
    (project) => project.name === name
  );
  if (projectAlreadyExists) {
    throw new AppError("Project already exists", 409);
  }

  const projectUserRepository = AppDataSource.getRepository(User);
  const user = await projectUserRepository.find({
    select: ["id", "name", "description"],
    where: { id: user_id },
  });

  if (!name || !description || !objective) {
    throw new AppError("Missing name, description or objectve", 422);
  }

  const project = new Project();
  project.name = name;
  project.description = description;
  project.objective = objective;
  project.active = true;

  project.users = [user[0]];

  projectRepository.create(project);
  await projectRepository.save(project);

  return project;
};

export default projectCreateService;
