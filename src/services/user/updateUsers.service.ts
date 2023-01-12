import { IUserResponse, IUserUpdate } from "../../interfaces/user";
import dataSourceConfig from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppErrors";
import { userWithoutPasswordSchema } from "../../schemas/users.schema";

export const updateUsersService = async (
  id: string,
  update: IUserUpdate
): Promise<IUserResponse> => {
  const userRepository = dataSourceConfig.getRepository(Users);

  const [foundUser] = await userRepository.find({
    where: { id: id },
    withDeleted: true,
  });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  const updatedUser = userRepository.create({
    ...foundUser,
    ...update,
  });
  await userRepository.save(updatedUser);

  const updateWithoutPassword = await userWithoutPasswordSchema.validate(
    updatedUser,
    { stripUnknown: true }
  );

  return updateWithoutPassword;
};
