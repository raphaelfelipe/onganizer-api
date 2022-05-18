import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"

const listUsersSrvice = async()=>{
    const repository = AppDataSource.getRepository(User)

    const users = await repository.find()
    
    const usersReturn = users.map(user=>({...user,password:undefined}))

   
    return usersReturn
}

export default listUsersSrvice 