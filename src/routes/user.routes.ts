import { Router } from "express";
import UsersController from "../controllers/users.controller";

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post("", usersController.store);

usersRoutes.get("", usersController.index);
usersRoutes.get("/:id", usersController.show);

usersRoutes.patch("/:id", usersController.update);

usersRoutes.delete("/:id", usersController.delete);

export default usersRoutes;
