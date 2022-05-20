import {Request, Response, NextFunction} from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/user.entity"

export const authUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const repository = AppDataSource.getRepository(User)
        const users = await repository.find()
        const account = users.find(user => user.id === req.userId)

        if(account?.is_admin){
            next()
        }

    }catch(err){
        return res.status(401).json({
            message: "You are not an administrator"
        })
    }
}