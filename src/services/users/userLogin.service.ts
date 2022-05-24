import { IUserLogin } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../../errors/appError";

const userLoginService = async ({email, password}:IUserLogin) => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const account = users.find(user => user.email === email)

    if(!account){
        throw new AppError("Wrong email/password", 403)
    }

    if(!bcrypt.compareSync(password, account.password)){
        throw new AppError("Wrong email/password", 403 )
    }

    const token = jwt.sign({
        email: email,
        id: account.id
        },
        String(process.env.JWT_SECRET),
        {expiresIn: "7d",}
    )

    return token
}

export default userLoginService