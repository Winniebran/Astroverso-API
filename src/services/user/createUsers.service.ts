import { IUserRequest, IUserResponse } from "../../interfaces/user";
import dataSourceConfig from "../../data-source";
import { Users } from "../../entities/users.entity";
import { userWithoutPasswordSchema } from "../../schemas/users.schema";
import { AppError } from "../../errors/AppErrors";

export const createUsersService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  const { email } = userData;
  const userRepository = dataSourceConfig.getRepository(Users);

  const emailExist = await userRepository.findOneBy({ email: email });

  if (!emailExist) {
    const user = userRepository.create(userData);
    await userRepository.save(user);
    const userWithoutPassword = await userWithoutPasswordSchema.validate(user, {
      stripUnknown: true,
    });

    return userWithoutPassword;
  }

  throw new AppError("Email already exists", 409);
};
