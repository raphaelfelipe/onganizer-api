import { Request, Response } from "express";

export default class CategoriesController {
  async store(req: Request, res: Response) {}

  async index(req: Request, res: Response) {}

  async show(req: Request, res: Response) {}

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await userDeleteService(id);

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
