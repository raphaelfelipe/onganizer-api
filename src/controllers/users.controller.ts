import { Request, Response } from "express";
import userCreateService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import listUserByIdService from "../services/users/listUserById.service";
import deleteUserService from "../services/users/deleteUser.service";
import updateUserService from "../services/users/updateUser.service";
import userListMeService from "../services/users/userListMe.service";
import userLoginService from "../services/users/userLogin.service";
import userListMeFeedService from "../services/users/userListMeFeed.service";

export default class UsersController {
  async create(req: Request, res: Response) {
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

  async list(req: Request, res: Response) {
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

  async listById(req: Request, res: Response) {
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

  async userListMe(req: Request, res: Response) {
    try{

      const email = req.userEmail
      const user = await userListMeService(email)

      return res.status(200).send(user)

    }catch(err){
        if(err instanceof Error){
            return res.status(401).send({
                error: err.name,
                message: err.message,
            })
        }
    }
  }

  async userListMeFeed(req: Request, res: Response) {
    try{

      const id = req.userId
      const user = await userListMeFeedService(id)

      return res.status(200).send(user)

    }catch(err){
        if(err instanceof Error){
            return res.status(401).send({
                error: err.name,
                message: err.message,
            })
        }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const token = await userLoginService({ email, password });

      return res.status(201).json({ token });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {id} = req.params
      const {email, password, name, description} = req.body
      const user = await updateUserService({id, email, password, name, description})

      return res.status(201).send({
          message: "User updated!",
          user
      })

  } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
            "error": err.name,
            "message": err.message
        })
      }
    }
  }

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
