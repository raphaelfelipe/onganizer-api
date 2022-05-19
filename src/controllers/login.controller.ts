import { Request, Response } from "express";
import userLoginService from "../services/users/userLogin.service";

export default class LoginController {
  async store(req: Request, res: Response) {
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
}
