import { Router } from "express";
import ProjectsController from "../controllers/projects.controller"
import { authProject } from "../middlewares/authProject.middleware";
import { authProjectOrAdmin } from "../middlewares/authProjectOrAdmin.middleware";
import { authToken } from "../middlewares/authToken.middleware";

const router = Router()
const projectsController = new ProjectsController()

router.get("", projectsController.projectList)
router.get("/:id", projectsController.projectListOne)
router.get("/:id/users", projectsController.listProjectUsers)
router.get("/:id/post", projectsController.listProjectPosts)
router.post("", authToken, projectsController.createProject)
router.post("/:id/users", authToken, authProject, projectsController.createProjectUsers)
router.post("/:id/posts", authToken, authProject, projectsController.createPost)
router.post("/follow/:id", authToken, projectsController.createFollowProject)
router.patch("/:id", authToken, authProjectOrAdmin, projectsController.projectUpdate)
router.delete("/:id", authToken, authProjectOrAdmin, projectsController.projectDelete)
router.delete("/follow/:id", authToken, projectsController.followProjectDelete)

export default router