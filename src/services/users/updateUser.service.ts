import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUpdatedUser } from "../../interfaces/users"

const updateUserService = async({id, email, password, name, description}:IUpdatedUser)=>{
    const repository = AppDataSource.getRepository(User)

    const users = await repository.find()

    const user = users.find(user=>user.id === id)
  
    await repository.update(user!.id,{name: name, email: email, password: password, description:description})

 

    return {message:'User successfully updated', UpdatedInfo:{
        
        name:name,
        email:email,
        password:password,
        description:description

    }
    }
}

export default updateUserService