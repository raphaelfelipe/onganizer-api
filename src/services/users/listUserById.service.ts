import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"


const listUserByIdService = async(id:string)=>{
    const repository = AppDataSource.getRepository(User)

    const users = await  repository.find()

    const user = users.find(user=>user.id === id)

    return {...user,password:undefined}
}

export default listUserByIdService