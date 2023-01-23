import { Request, Response } from "express";
import { profileUserService } from "../../services/profile/profileUser.service";

export const profileUserController = async (req: Request, res: Response) => {
	const userId: string = req.users.id;
	const profileUser = await profileUserService(userId);
	return res.json(profileUser);
};
