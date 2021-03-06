import { User } from "../../entities/user.entity";
import { IUserCreate } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/appError";

const userCreateService = async ({
  name,
  email,
  password,
  description,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError("Email already in use", 409);
  }

  if (!name || !email || !password) {
    throw new AppError("Missing name, email or password", 422);
  }

  if (!description) {
    description = "";
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = bcrypt.hashSync(password, 10);
  user.description = description;

  userRepository.create(user);
  await userRepository.save(user);

  return await userRepository
    .createQueryBuilder("user")
    .select([
      "user.id",
      "user.name",
      "user.email",
      "user.description",
      "user.created_at",
      "user.updated_at",
    ])
    .where({ id: user.id })
    .getOne();
};

export default userCreateService;
