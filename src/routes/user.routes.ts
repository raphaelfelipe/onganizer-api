import { Router } from "express";
import UsersController from "../controllers/users.controller";

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post("", usersController.create);
usersRoutes.post("/login", usersController.login);

usersRoutes.get("", usersController.list);
usersRoutes.get("/:id", usersController.listById);
usersRoutes.get("/me", usersController.userListMe);
usersRoutes.get("/me/feed", usersController.userListMeFeed);

usersRoutes.patch("/:id", usersController.update);

usersRoutes.delete("/:id", usersController.delete);

export default usersRoutes;
