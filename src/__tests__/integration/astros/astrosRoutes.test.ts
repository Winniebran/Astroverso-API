import request from "supertest";
import { app } from "../../../app";
import { DataSource } from "typeorm";
import dataSourceConfig from "../../../data-source";
import {
	mockAdm,
	mockAdmLogin,
	mockUser,
	mockUserLogin
} from "../../mocks/users.mocks";
import { mockAstro, mockAstroUpdate } from "../../mocks/astros.mocks";

describe("/astros", () => {
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
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("POST /astros -  Must be able to create astro", async () => {
		await request(app).post("/users").send(mockAdm);
		const admLogin = await request(app).post("/login").send(mockAdmLogin);

		const response = await request(app)
			.post("/astros")
			.set("Authorization", `Bearer ${admLogin.body.token}`)
			.send(mockAstro);

		expect(response.body).toHaveProperty("name");
		expect(response.body).toHaveProperty("id");
		expect(response.status).toBe(201);
	});

	test("POST /astros -  should not be able to create astro that already exists", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.post("/astros")
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockAstro);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(409);
	});

	test("POST /astros -  should not be able to create category without authentication", async () => {
		const response = await request(app).post("/astros").send(mockAstro);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("POST /astro - should not be able to create astro not being admin", async () => {
		await request(app).post("/users").send(mockUser);
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);

		const response = await request(app)
			.post("/astros")
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`)
			.send(mockAstro);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);
	});

	test("GET /astros -  Must be able to list all astros", async () => {
		const response = await request(app).get("/astros");

		expect(response.body).toHaveLength(1);
		expect(response.status).toBe(200);
	});

	test("PATCH /astros/:id - should be able to update astro", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);
		const astroTobeUpdate = await request(app).get("/astros");

		const response = await request(app)
			.patch(`/astros/${astroTobeUpdate.body[0].id}`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockAstroUpdate);

		expect(response.status).toBe(200);
		expect(response.body.name).toEqual(mockAstroUpdate.name);
	});

	test("PATCH /astros/:id - should not be able to update astro without authentication", async () => {
		const astroTobeUpdate = await request(app).get("/astros");

		const response = await request(app)
			.patch(`/users/${astroTobeUpdate.body[0].id}`)
			.send(mockAstroUpdate);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("PATCH /astros/:id - should not be able to update astro not being admin", async () => {
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);

		const response = await request(app)
			.patch(`/astros/6620d602-dcdb-4f4a-9105-70e3cd7fe953`)
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`)
			.send(mockAstroUpdate);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);
	});

	test("PATCH /astros/:id - should not be able to update with invalid id", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.patch(`/astros/6620d602-dcdb-4f4a-9105-70e3cd7fe953`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockAstroUpdate);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	});

	test("PATCH /astros/:id - should not be able to update id field value", async () => {
		const astroTobeUpdate = await request(app).get("/astros");
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.patch(`/astros/${astroTobeUpdate.body[0].id}`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send({ ...mockAstroUpdate, id: "6620d602-dcdb-4f4a-9105-70e3cd7fe953" });

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("DELETE /astros/:id - should not be able to delete astro without authentication", async () => {
		const astroTobeDelete = await request(app).get("/astros");
		const response = await request(app).delete(
			`/astros/${astroTobeDelete.body[0].id}`
		);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("DELETE /astros/:id - should not be able to delete astro not being admin", async () => {
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);
		const astroToBeDelete = await request(app).get("/astros");

		const response = await request(app)
			.delete(`/astros/${astroToBeDelete.body[0].id}`)
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);
	});

	test("DELETE /astros/:id - should not be able to delete with invalid id", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.delete(`/astros/6620d602-dcdb-4f4a-9105-70e3cd7fe953`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	});

	test("DELETE /astros/:id - should be able to delete astro", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);
		const astroTobeDelete = await request(app).get("/astros");

		const response = await request(app)
			.delete(`/astros/${astroTobeDelete.body[0].id}`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`);

		expect(response.status).toBe(204);
	});
});
