import { handleError } from "./../errors/appError";
import { Request, Response } from "express";
import userCreateService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import listUserByIdService from "../services/users/listUserById.service";
import deleteUserService from "../services/users/deleteUser.service";
import updateUserService from "../services/users/updateUser.service";
import userListMeService from "../services/users/userListMe.service";
import userLoginService from "../services/users/userLogin.service";
import userListMeFeedService from "../services/users/userListMeFeed.service";
import { AppError } from "../errors/appError";

export default class UsersController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, description, password } = req.body;

      const newUser = await userCreateService({
        name,
        email,
        description,
        password,
      });

      return res.status(201).send(newUser);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async list(req: Request, res: Response) {
    try {
      const users = await listUsersService();

      return res.send(users);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await listUserByIdService(id);

      return res.status(200).send(user);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async userListMe(req: Request, res: Response) {
    try {
      const email = req.userEmail;
      const user = await userListMeService(email);

      return res.status(200).send(user);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async userListMeFeed(req: Request, res: Response) {
    try {
      const id = req.userId;
      const user = await userListMeFeedService(id);

      return res.status(200).send(user);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const token = await userLoginService({ email, password });

      return res.status(201).json({ token });
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, password, name, description } = req.body;
      const user = await updateUserService({
        id,
        email,
        password,
        name,
        description,
      });

      return res.status(201).send({ user });
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await deleteUserService(id);

      return res.status(200).json({ message: "User deleted with success" });
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
}
