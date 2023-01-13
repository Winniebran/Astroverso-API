import { IAstrosRequest } from "../../interfaces/astros";
import { ICategoriesRequest } from "../../interfaces/categories";
import { IUserLogin, IUserRequest, IUserUpdate } from "../../interfaces/user";

export const mockedCategory: ICategoriesRequest = {
	name: "Teste"
};

export const mockedAstro: IAstrosRequest = {
	name: "Galaxies",
	image:
		"https://www.visualcapitalist.com/wp-content/uploads/2022/06/The-entire-universe-1000x600.jpeg"
};

export const mockedUser: IUserRequest = {
	name: "Miguel",
	email: "miguel@mail.com",
	isAdm: false,
	password: "123456"
};

export const mockedAdmin: IUserRequest = {
	name: "Felipe",
	email: "felipe@mail.com",
	isAdm: true,
	password: "123456"
};

export const mockedUserLogin: IUserLogin = {
	email: "miguel@mail.com",
	password: "123456"
};

export const mockedAdminLogin: IUserLogin = {
	email: "felipe@mail.com",
	password: "123456"
};

export const mockedUserUpdate: IUserUpdate = {
	name: "Miguel 2",
	email: "miguel2@test.com",
	password: "654321"
};

export const mockedAdminUpdate: IUserUpdate = {
	name: "Felipe 2",
	email: "felipe2@mail.com",
	password: "654321"
};
