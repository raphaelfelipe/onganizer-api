import { User } from "../../entities/user.entity";
import { IUserCreate } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";

const userCreateService = async ({
  name,
  email,
  password,
  description,
  created_at,
  updated_at,
  is_admin = false,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new Error("Email already exists");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = bcrypt.hashSync(password, 10);
  user.description = description;
  user.created_at = new Date();
  user.updated_at = new Date();
  user.is_admin = is_admin;

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

export default userCreateService;
