import { AppError } from "../../errors/AppErrors";
import { IUserResponse } from "../../interfaces/user";
import { listOneUserService } from "../user/listOneUser.service";

export const profileUserService = async (
	id: string
): Promise<IUserResponse> => {
	const user = await listOneUserService(id);
	return user;
};
