import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"

const deleteUserService = async(id:string)=>{
    const repository = AppDataSource.getRepository(User)

    const users = await repository.find()

    const user = users.find(user=>user.id === id)

    await repository.delete(user!.id)

    return true
}

export default deleteUserService