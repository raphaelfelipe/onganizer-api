import { Router } from "express";
import UsersController from "../controllers/users.controller";
import { authProject } from "../middlewares/authProject.middleware";
import { authToken } from "../middlewares/authToken.middleware";
import { authUser } from "../middlewares/authUser.middleware";

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post("", usersController.create);
usersRoutes.post("/login", usersController.login);

usersRoutes.get("", usersController.list);
usersRoutes.get("/:id", usersController.listById);

usersRoutes.get("/me/myself", authToken, usersController.userListMe);
usersRoutes.get("/me/feed", authToken, usersController.userListMeFeed);

usersRoutes.patch("/:id", authToken, authUser, usersController.update);

usersRoutes.delete("/:id", authToken, authUser, usersController.delete);

export default usersRoutes;
