import { Request, Response } from "express";
import userCreateService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import listUserByIdService from "../services/users/listUserById.service";
import deleteUserService from "../services/users/deleteUser.service";

export default class UsersController {
  async store(req: Request, res: Response) {
    try {
      const { name, email, description, password, is_admin = false } = req.body;

      const newUser = await userCreateService({
        name,
        email,
        description,
        password,
        created_at: new Date(),
        updated_at: new Date(),
        is_admin,
      });

      return res.status(201).send(newUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  async index(req: Request, res: Response) {
    try {
      const users = await listUsersService();

      return res.send(users);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await listUserByIdService(id);

      return res.status(200).send(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await deleteUserService(id);

      return res.status(200).json({ message: "User deleted with succes!" });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }
}
