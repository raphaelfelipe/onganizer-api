import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const projectRepository = AppDataSource.getRepository(Project);

  const users = await userRepository.find();
  const projects = await projectRepository.find({ relations: ["users"] });

  const user = users.find((user) => user.id === id);

  const projectArray = projects.filter((project) =>
    project.users.some((item) => item.id === id)
  );

  console.log(projectArray);

  projectArray.forEach(async (project) => {
    if (project.users.length === 1) {
      await projectRepository.update(project!.id, { active: false });
    }
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await userRepository.delete(user!.id);

  return true;
};

export default deleteUserService;
