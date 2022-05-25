import { Router } from "express";
import ProjectsController from "../controllers/projects.controller"
import { authProjectOrAdmin } from "../middlewares/authProjectOrAdmin.middleware";
import { authToken } from "../middlewares/authToken.middleware";
import { authUUID } from "../middlewares/authUUID.middleware";

const router = Router({ mergeParams: true })
const projectsController = new ProjectsController()

router.get("", projectsController.projectList)
router.get("/:id", authUUID, projectsController.projectListOne)
router.get("/:id/users", authUUID, projectsController.listProjectUsers)
router.get("/:id/posts", authUUID, projectsController.listProjectPosts)

router.use(authToken)
router.post("", projectsController.createProject)
router.post("/follow/:id", authUUID, projectsController.createFollowProject)
router.delete("/follow/:id", authUUID, projectsController.followProjectDelete)
router.post("/:id/users", authUUID, authProjectOrAdmin, projectsController.createProjectUsers)
router.post("/:id/posts", authUUID, authProjectOrAdmin, projectsController.createPost)
router.patch("/:id", authUUID, authProjectOrAdmin, projectsController.projectUpdate)
router.delete("/:id", authUUID, projectsController.projectDelete)


export default router