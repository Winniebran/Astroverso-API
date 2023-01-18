import { IUserResponse } from "../../interfaces/user";
import dataSourceConfig from "../../data-source";
import { userWithoutPasswordSchema } from "../../schemas/users.schema";
import { Users } from "../../entities/users.entity";

export const listOneUserService = async (
  id: string
): Promise<IUserResponse> => {
  const userRepository = dataSourceConfig.getRepository(Users);

  const user = await userRepository.findOne({
    where: { id: id },
    withDeleted: true,
  });

  const userWithoutPassword = await userWithoutPasswordSchema.validate(user, {
    stripUnknown: true,
  });

  return userWithoutPassword;
};
