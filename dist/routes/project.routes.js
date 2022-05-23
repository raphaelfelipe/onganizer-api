"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_controller_1 = __importDefault(require("../controllers/projects.controller"));
const authProject_middleware_1 = require("../middlewares/authProject.middleware");
const authProjectOrAdmin_middleware_1 = require("../middlewares/authProjectOrAdmin.middleware");
const authToken_middleware_1 = require("../middlewares/authToken.middleware");
const router = (0, express_1.Router)();
const projectsController = new projects_controller_1.default();
router.get("", projectsController.projectList);
router.get("/:id", projectsController.projectListOne);
router.get("/:id/users", projectsController.listProjectUsers);
router.get("/:id/post", projectsController.listProjectPosts);
router.post("", authToken_middleware_1.authToken, projectsController.createProject);
router.post("/:id/users", authToken_middleware_1.authToken, authProject_middleware_1.authProject, projectsController.createProjectUsers);
router.post("/:id/posts", authToken_middleware_1.authToken, authProject_middleware_1.authProject, projectsController.createPost);
router.post("/follow/:id", authToken_middleware_1.authToken, projectsController.createFollowProject);
router.patch("/:id", authToken_middleware_1.authToken, authProjectOrAdmin_middleware_1.authProjectOrAdmin, projectsController.projectUpdate);
router.delete("/:id", authToken_middleware_1.authToken, authProjectOrAdmin_middleware_1.authProjectOrAdmin, projectsController.projectDelete);
router.delete("/follow/:id", authToken_middleware_1.authToken, projectsController.followProjectDelete);
exports.default = router;