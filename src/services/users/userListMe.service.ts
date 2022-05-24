import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const userListMeService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);

  return await userRepository
    .createQueryBuilder("account")
    .select([
      "account.id",
      "account.name",
      "account.email",
      "account.description",
      "account.created_at",
      "account.updated_at",
    ])
    .where({ id: account!.id })
    .getOne();
};

export default userListMeService;
