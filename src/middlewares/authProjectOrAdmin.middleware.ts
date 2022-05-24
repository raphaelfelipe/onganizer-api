import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

export const authProjectOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repository = AppDataSource.getRepository(User);
    const users = await repository.find();
    const account = users.find((user) => user.id === req.userId);

    if (account?.is_admin) {
      next();
    }

    // const projectUserRepository = AppDataSource.getRepository(Project_User);
    // const { id: projectId } = req.params;
    // const projectUsers = await projectUserRepository.find();

    // const selectedUser = projectUsers.find(
    //     (projectUser) =>
    //         projectUser.users_id === req.userId &&
    //         projectUser.projects_id === projectId
    // );

    // if (selectedUser) {
    //     next();
    // }
  } catch (error) {
    throw new AppError("Unauthorised access", 401);
  }
};
