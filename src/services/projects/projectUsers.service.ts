import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { IProjectId } from "../../interfaces/projects";
import { AppError } from "../../errors/appError";

const projectUsersService = async ({ id }: IProjectId) => {
  const projectUserRepository = AppDataSource.getRepository(Project);
  const projects = await projectUserRepository.find();

  const projectFound = projects.find((project) => project.id === id);

  if (!projectFound) {
    throw new AppError("Project not found", 404);
  }

  return await projectUserRepository
    .createQueryBuilder("project")
    .leftJoinAndSelect("project.users", "user")
    .select([
      "project.id",
      "project.name",
      "user.id",
      "user.name",
      "user.email",
      "user.description",
    ])
    .where({ id: id })
    .getOne();
};

export default projectUsersService;
