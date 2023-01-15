import { IUserLogin, IUserRequest } from "../../interfaces/user";

export const mockAdm: IUserRequest = {
  name: "Kenzinho",
  email: "kenzinho@mail.com",
  password: "12345Aa@",
  isAdm: true
};

export const mockUser: IUserRequest = {
  name: "Amora",
  email: "amora@mail.com",
  password: "12345Aa@",
  isAdm: false
};

export const mockUser2: IUserRequest = {
  name: "João",
  email: "joao@mail.com",
  password: "12345Aa@",
  isAdm: false
};

export const mockUser3: IUserRequest = {
  name: "Aurora",
  email: "aurora@mail.com",
  password: "12345Aa@",
  isAdm: false
};

export const mockAdmLogin: IUserLogin = {
  email: "kenzinho@mail.com",
  password: "12345Aa@",
};

export const mockUserLogin: IUserLogin = {
  email: "amora@mail.com",
  password: "12345Aa@",
};
