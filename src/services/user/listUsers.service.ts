import { IUserResponse } from "../../interfaces/user";
import dataSourceConfig from "../../data-source";
import { Users } from "../../entities/users.entity";
import { listUsersWithoutPassword } from "../../schemas/users.schema";

export const listUsersService = async (): Promise<
  IUserResponse[] | undefined
> => {
  const userRepository = dataSourceConfig.getRepository(Users);

  const users = await userRepository.find({ withDeleted: true });
  const userWithoutPassword = await listUsersWithoutPassword.validate(users, {
    stripUnknown: true,
  });

  return userWithoutPassword;
};
