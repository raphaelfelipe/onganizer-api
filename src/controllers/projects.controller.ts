import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import followProjectService from "../services/projects/followProject.service";
import deleteFollowService from "../services/projects/followProjectDelete.service";
import projectPostsService from "../services/projects/listProjectPosts.service";
import postCreateService from "../services/projects/postCreate.service";
import projectCreateService from "../services/projects/projectCreate.service";
import projectDeleteSelfService from "../services/projects/projectDelete.service";
import projectListService from "../services/projects/projectList.service";
import projectListOneService from "../services/projects/projectListOne.service";
import projectUpdateService from "../services/projects/projectUpdate.service";
import projectUsersService from "../services/projects/projectUsers.service";
import userProjectCreateService from "../services/projects/projectUsersCreate.service";

export default class ProjectsController {
  async createProject(req: Request, res: Response) {
    try {
      const user_id = req.userId;
      const { name, description, objective, active } = req.body;
      const newProject = await projectCreateService({
        user_id,
        name,
        description,
        objective,
      });
      return res.status(201).send(newProject);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      const { id: project_id } = req.params;
      const { title, content } = req.body;
      const newPost = await postCreateService({
        project_id,
        title,
        content,
      });
      return res.status(201).send(newPost);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async createProjectUsers(req: Request, res: Response) {
    try {
      const user_id = req.userId;
      const { id: project_id } = req.params;
      const newProjectUsers = await userProjectCreateService({
        project_id,
        user_id,
      });

      return res.status(201).send(newProjectUsers);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async createFollowProject(req: Request, res: Response) {
    try {
      const user_id = req.userId;
      const { id: project_id } = req.params;
      const newFollowProject = await followProjectService({
        project_id,
        user_id,
      });

      return res.status(201).send(newFollowProject);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async projectList(req: Request, res: Response) {
    try {
      const projects = await projectListService();

      return res.send(projects);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async projectListOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const project = await projectListOneService({ id });

      return res.status(200).send(project);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listProjectUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const projectUsers = await projectUsersService({ id });

      return res.status(200).send(projectUsers);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listProjectPosts(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const projectPosts = await projectPostsService({ id });

      return res.status(200).send(projectPosts);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async projectUpdate(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { active, objective, name, description } = req.body;
      const project = await projectUpdateService({
        id,
        active,
        objective,
        name,
        description,
      });

      return res.status(201).send({
        message: "Project updated",
        project,
      });
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async projectDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await projectDeleteSelfService(id);

      return res.status(200).json({ message: "Project deleted with success" });
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async followProjectDelete(req: Request, res: Response) {
    try {
      const user_id = req.userId;
      const { id: project_id } = req.params;
      const followProject = await deleteFollowService({ project_id, user_id });

      return res.status(200).json({ message: "Project unfollowed" });
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
}
