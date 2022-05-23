import { Router } from "express";
import UsersController from "../controllers/users.controller";
import { authUserAdmin } from "../middlewares/authAdmin.middleware";
import { authProject } from "../middlewares/authProject.middleware";
import { authToken } from "../middlewares/authToken.middleware";
import { authUser } from "../middlewares/authUser.middleware";

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post("", usersController.create);
usersRoutes.post("/login", usersController.login);
usersRoutes.get("", usersController.list);
usersRoutes.get("/:id", usersController.listById);
usersRoutes.use(authToken);
usersRoutes.get("/me/myself", usersController.userListMe);
usersRoutes.get("/me/feed", usersController.userListMeFeed);
usersRoutes.use(authUserAdmin);
usersRoutes.patch("/:id", usersController.update);
usersRoutes.delete("/:id", usersController.delete);

export default usersRoutes;
