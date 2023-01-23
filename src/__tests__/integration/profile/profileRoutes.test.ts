import { DataSource } from "typeorm";
import dataSourceConfig from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import {
	mockAdm,
	mockAdmLogin,
	mockUser,
	mockUserLogin
} from "../../mocks/users.mocks";

describe("/profile", () => {
	let connection: DataSource;

	beforeAll(async () => {
		await dataSourceConfig
			.initialize()
			.then(res => {
				connection = res;
			})
			.catch(err => {
				console.error("Error during Data Source initialization", err);
			});

		await request(app).post("/users").send(mockUser);
		await request(app).post("/users").send(mockAdm);
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("GET /profile - Should be able to get user profile", async () => {
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);

		const res = await request(app)
			.get("/profile")
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`);

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("id");
		expect(res.body).toHaveProperty("name");
		expect(res.body).toHaveProperty("email");
		expect(res.body).toHaveProperty("isAdm");
		expect(res.body).toHaveProperty("score");
		expect(res.body).toHaveProperty("isActive");
		expect(res.body).toHaveProperty("createdAt");
		expect(res.body).toHaveProperty("updatedAt");
		expect(res.body).not.toHaveProperty("password");
	});

	test("GET /profile - Shouldn't be able to get user profile without authentication", async () => {
		const res = await request(app).get("/profile");

		expect(res.status).toBe(401);
		expect(res.body).toHaveProperty("message");
	});
});
