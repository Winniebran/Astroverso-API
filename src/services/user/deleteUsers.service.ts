import dataSourceConfig from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppErrors";

export const deleteUsersService = async (id: string) => {
  const userRepository = dataSourceConfig.getRepository(Users);
  const [foundUser] = await userRepository.find({
    where: { id: id },
    withDeleted: true,
  });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  if (!foundUser?.isActive) {
    throw new AppError("User is already inactive", 400);
  }

  await userRepository.softRemove(foundUser);
  const userDeleted = await userRepository.save({ ...foundUser, isActive: false });

  return userDeleted;
};
