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
router.use(authToken)
router.post("", projectsController.createProject)
router.post("/follow/:id", projectsController.createFollowProject)
router.delete("/follow/:id", projectsController.followProjectDelete)
router.post("/:id/users", authProject, projectsController.createProjectUsers)
router.post("/:id/posts", authProject, projectsController.createPost)
router.patch("/:id", authProjectOrAdmin, projectsController.projectUpdate)
router.delete("/:id",  projectsController.projectDelete)


export default router