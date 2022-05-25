import { Router } from "express";
import UsersController from "../controllers/users.controller";
import { authToken } from "../middlewares/authToken.middleware";
import { authUserOrAdmin } from "../middlewares/authUserAdmin.middleware";
import { authUUID } from "../middlewares/authUUID.middleware";

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post("", usersController.create);
usersRoutes.post("/login", usersController.login);
usersRoutes.get("", usersController.list);
usersRoutes.get("/:id", authUUID, usersController.listById);
usersRoutes.use(authToken);
usersRoutes.get("/me/info", usersController.userListMe);
usersRoutes.get("/me/feed", usersController.userListMeFeed);
usersRoutes.patch("/:id", authUUID, authUserOrAdmin, usersController.update);
usersRoutes.delete("/:id", authUUID, authUserOrAdmin, usersController.delete);

export default usersRoutes;
