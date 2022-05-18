import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"

const listUsersSrvice = async()=>{
    const repository = AppDataSource.getRepository(User)

    const users = await repository.find()
    const usersReturn = users.map(users=>{

        const user ={
            id:users.name,
            name:users.name,
            email: users.email,
            description: users.description,
            created_at: users.created_at,
            updated_at:users.updated_at
        }
        return user
    })
   
    return usersReturn
}

export default listUsersSrvice 