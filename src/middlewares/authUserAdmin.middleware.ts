import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/user.entity"

export const authUserOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const repository = AppDataSource.getRepository(User)
        const users = await repository.find()
        const account = users.find(user => user.id === req.userId)

        if(account?.is_admin){
            next()
        }

        const { id: userId } = req.params;

        if (userId === req.userId) {
            next();
        }else{
            throw new Error();
        }

    }catch(err){
        return res.status(401).json({
            message: "Unauthorised access"
        })
    }
}