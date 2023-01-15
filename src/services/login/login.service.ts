import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { IUserLogin } from "../../interfaces/user";
import dataSourceConfig from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppErrors";

export const loginService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = dataSourceConfig.getRepository(Users);

  const user = await userRepository.findOneBy({ email: email });

  if (!user) {
    throw new AppError("Email or password is invalid", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Email or password is invalid", 403);
  }

  const token = jwt.sign({ email: user.email, isAdm: user.isAdm }, process.env.SECRET_KEY!, {
    subject: user.id,
    expiresIn: "24h",
  });

  return token;
};
