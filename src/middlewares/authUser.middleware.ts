import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Project_User } from "../entities/project_user.entity";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectUserRepository = AppDataSource.getRepository(Project_User);

    const { id: projectId } = req.params;

    const projectUsers = await projectUserRepository.find();

    const selectedUser = projectUsers.find(
      (projectUser) =>
        projectUser.users_id === req.userId &&
        projectUser.projects_id === projectId
    );

    if (!selectedUser) {
      throw new Error();
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "You are not allowed to do that on this project",
    });
  }
};
