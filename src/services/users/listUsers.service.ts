import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"

const listUsersSrvice = async()=>{
    const repository = AppDataSource.getRepository(User)

    const users = repository.find()

    return users
}

export default listUsersSrvice 