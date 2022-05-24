import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

const deleteUserService = async(id:string)=>{
    const repository = AppDataSource.getRepository(User)

    const users = await repository.find()

    const user = users.find(user=>user.id === id)
    
    if(!user){
        throw new AppError ("User not found", 404)
    }

    await repository.delete(user!.id)

    return true
}

export default deleteUserService