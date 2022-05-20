import { Router } from "express";
import ProjectsController from "../controllers/projects.controller"

const router = Router()
const projectsController = new ProjectsController()

router.get("", projectsController.projectList)
router.get("/:id", projectsController.projectListOne)
router.get("/:id/users", projectsController.listProjectUsers)
router.get("/:id/post", projectsController.listProjectPosts)
router.post("", projectsController.createProject)
router.post("/:id/users", projectsController.createProjectUsers)
router.post("/:id/posts", projectsController.createPost)
router.post("/follow/:id", projectsController.createFollowProject)
router.patch("/:id", projectsController.projectUpdate)
router.delete("/:id", projectsController.projectDelete)
router.delete("/follow/:id", projectsController.followProjectDelete)

export default router