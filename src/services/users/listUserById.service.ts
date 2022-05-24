import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"


const listUserByIdService = async (id: string) => {
    const repository = AppDataSource.getRepository(User)

    const users = await repository.find()

    const user = users.find(user => user.id === id)

    const usersReturn = users.map((user) => ({ ...user, email: undefined, created_at: undefined, updated_at: undefined, is_admin: undefined }));

    if (!user) {
        throw new AppError("User not found", 404)
    }

    return { ...user, password: undefined, email: undefined, created_at: undefined, updated_at: undefined, is_admin: undefined }
}

export default listUserByIdService