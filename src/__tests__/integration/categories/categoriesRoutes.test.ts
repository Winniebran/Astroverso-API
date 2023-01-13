import request from "supertest";
import { app } from "../../../app";
import { DataSource } from "typeorm";
import dataSourceConfig from "../../../data-source";
import {
	mockedAdmin,
	mockedAdminLogin,
	mockedCategory,
	mockedUser,
	mockedUserLogin
} from "../../mocks";

describe("/categories", () => {
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

		await request(app).post("/users").send(mockedUser);
		await request(app).post("/users").send(mockedAdmin);
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("POST /categories -  Must be able to create category", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedAdminLogin);
		const response = await request(app)
			.post("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
			.send(mockedCategory);
		console.log(response.body);

		expect(response.body).toHaveProperty("name");
		expect(response.body).toHaveProperty("id");
		expect(response.status).toBe(201);
	});

	test("POST /categories -  should not be able to create category that already exists", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedAdminLogin);
		const response = await request(app)
			.post("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
			.send(mockedCategory);
		console.log(response.body);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(409);
	});

	test("POST /categories -  should not be able to create category without authentication", async () => {
		const response = await request(app)
			.post("/categories")
			.send(mockedCategory);
		console.log(response.body);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("POST /categories - should not be able to create category not being admin", async () => {
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockedUserLogin);
		const response = await request(app)
			.post("/categories")
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`)
			.send(mockedCategory);
		console.log(response.body);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);
	});

	test("GET /categories -  Must be able to list all categories", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedAdminLogin);
		await request(app)
			.post("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
			.send(mockedCategory);
		const response = await request(app).get("/categories");
		console.log(response.body);

		expect(response.body).toHaveLength(1);
		expect(response.status).toBe(200);
	});
});
