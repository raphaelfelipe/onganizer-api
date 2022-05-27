import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/user.entity"
import { Project } from "../entities/project.entity"
import { Project_Posts } from "../entities/project_posts.entity"
import { AppError } from "../errors/appError"

export const authPostOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repository = AppDataSource.getRepository(User)
        const users = await repository.find()
        const account = users.find(user => user.id === req.userId)

        if (account?.is_admin) {
            next()
        }

        const { id: postId } = req.params;

        const postsRepository = AppDataSource.getRepository(Project_Posts)
        const post = await postsRepository.findOne({
            where: { id: postId },
            relations: ["project"]
        })
        if (!post){
            throw new AppError("Post not found", 404)
        }

        const projectUserRepository = AppDataSource.getRepository(Project);
        const project = await projectUserRepository.findOne({
            where: { id: post!.project.id },
            relations: ["users"]
        });

        let selectedUser: boolean = false

        project?.users.forEach(user => {
            user.id === req.userId ? selectedUser = true : selectedUser = selectedUser
        });

        if (selectedUser) {
            next();
        }

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorised access"
        })
    }
}