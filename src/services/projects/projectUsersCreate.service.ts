import { IFollowCreate } from "../../interfaces/projects";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import uuidValidateV4 from "../../utils/uuidValidator";

const userProjectCreateService = async ({
  project_id,
  user_id,
}: IFollowCreate) => {
  if (!uuidValidateV4(user_id)) {
    throw new AppError("id not valid", 422);
  }

  const projectRepository = AppDataSource.getRepository(Project);
  const project = await projectRepository.findOne({
    where: { id: project_id },
    relations: ["users"],
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: user_id },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (project!.users.some(user => user.id === user_id)) {
    throw new AppError("user is already a project administrator", 409);
  }

  project!.users.push(user!);

  await projectRepository.save(project!);

  return await projectRepository
    .createQueryBuilder("project")
    .leftJoinAndSelect("project.users", "user")
    .select([
      "project",
      "user.id",
      "user.name",
      "user.email",
      "user.description",
    ])
    .where({ id: project_id })
    .getOne();
};

export default userProjectCreateService;
