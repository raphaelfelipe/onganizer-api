import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUpdatedUser } from "../../interfaces/users";
import bcrypt from "bcrypt";

const updateUserService = async ({
  id,
  email,
  password,
  name,
  description,
}: IUpdatedUser) => {
  const repository = AppDataSource.getRepository(User);

  const users = await repository.find();

  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await repository.update(user!.id, {
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10),
    description: description,
  });

  return {
    message: "User successfully updated",
    UpdatedInfo: {
      name: name,
      email: email,
      password: password,
      description: description,
    },
  };
};

export default updateUserService;
