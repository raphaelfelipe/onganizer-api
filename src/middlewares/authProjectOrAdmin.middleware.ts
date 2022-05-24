import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/user.entity"
import { Project } from "../entities/project.entity"

export const authProjectOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repository = AppDataSource.getRepository(User)
        const users = await repository.find()
        const account = users.find(user => user.id === req.userId)

        if (account?.is_admin) {
            next()
        }

        const projectUserRepository = AppDataSource.getRepository(Project);
        const { id: projectId } = req.params;
        const project = await projectUserRepository.findOne({
            where: {id:projectId},
            relations: ["users"]
        });
        console.log(account, project)
        let selectedUser : boolean = false

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