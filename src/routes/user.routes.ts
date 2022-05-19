import { Router } from "express";
import UsersController from "../controllers/users.controller";
import LoginController from "../controllers/login.controller";

const usersController = new UsersController();
const loginController = new LoginController();

const usersRoutes = Router();

usersRoutes.post("", usersController.store);
usersRoutes.post("/login", loginController.store);

usersRoutes.get("", usersController.index);
usersRoutes.get("/:id", usersController.show);

usersRoutes.patch("/:id", usersController.update);

usersRoutes.delete("/:id", usersController.delete);

export default usersRoutes;
