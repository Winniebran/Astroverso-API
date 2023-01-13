import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/user";
import { loginService } from "../../services/login/login.service";

export const loginController = async (req: Request, res: Response) => {
  const loginData: IUserLogin = req.body;
  const token = await loginService(loginData);
  return res.json({ token });
};
