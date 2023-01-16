import { IUserResponse } from "../../interfaces/user";
import dataSourceConfig from "../../data-source";
import { Users } from "../../entities/users.entity";
import { listUsersWithoutPassword } from "../../schemas/users.schema";
import { AppError } from "../../errors/AppErrors";

export const listOneUserService = async (
  id: string
): Promise<IUserResponse[] | undefined> => {
  const userRepository = dataSourceConfig.getRepository(Users);

  const user = await userRepository.find({
    where: { id: id },
    withDeleted: true,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const userWithoutPassword = await listUsersWithoutPassword.validate(user, {
    stripUnknown: true,
  });

  return userWithoutPassword;
};
