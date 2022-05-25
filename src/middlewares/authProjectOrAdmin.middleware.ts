import { AppError, handleError } from "../errors/appError";
import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/user.entity"
import { Project } from "../entities/project.entity"


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
      return next()
    }

    const projectUserRepository = AppDataSource.getRepository(Project);
    const { id: projectId } = req.params;
    const project = await projectUserRepository.findOne({
      where: { id: projectId },
      relations: ["users"]
    });

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    let selectedUser: boolean = false

    project?.users.forEach(user => {
      user.id === req.userId ? selectedUser = true : selectedUser = selectedUser
    });


    if (selectedUser) {
      return next();
    }
    throw new AppError("Unauthorised access", 401);

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res)
    }
  }
};
