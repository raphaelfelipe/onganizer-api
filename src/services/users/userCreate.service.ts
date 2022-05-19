import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt"
import { IUserCreate } from "../../interfaces/users";

const userCreateService = async ({email, name, description, password}: IUserCreate) => {

    const userRepository = AppDataSource.getRepository(User) 

    const users = await userRepository.find()

    const emailAlreadyExists = users.find(user => user.email === email)

    if (emailAlreadyExists) {
        throw new Error("Email already exists")
    }

    const user = new User()
    user.email = email
    user.name = name
    user.description = description
    user.password = bcrypt.hashSync(password, 8)
    user.created_at = new Date()
    user.updated_at = new Date()

    userRepository.create(user)
    await userRepository.save(user)

    return user
}

export default userCreateService