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
import { mockCategory, mockCategoryUpdate } from "../../mocks/categories.mock";
import { ValidationError } from "yup";

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
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("POST /categories -  Must be able to create category", async () => {
		await request(app).post("/users").send(mockAdm);
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);
		const response = await request(app)
			.post("/categories")
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockCategory);

		expect(response.body).toHaveProperty("name");
		expect(response.body).toHaveProperty("id");
		expect(response.status).toBe(201);
	});

	test("POST /categories -  should not be able to create category with empty field", async () => {
		const admLogin = await request(app).post("/login").send(mockAdmLogin);
		const response = await request(app)
			.post("/categories")
			.set("Authorization", `Bearer ${admLogin.body.token}`)
			.send({ name: "" });

		const mockError = { errors: response.body.error };
		expect(response.status).toBe(400);
		expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
	});

	test("POST /categories -  should not be able to create category that already exists", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.post("/categories")
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockCategory);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(409);
	});

	test("POST /categories -  should not be able to create category without authentication", async () => {
		const response = await request(app).post("/categories").send(mockCategory);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("POST /category - should not be able to create category not being admin", async () => {
		await request(app).post("/users").send(mockUser);
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);

		const response = await request(app)
			.post("/categories")
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`)
			.send(mockCategory);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);
	});

	test("GET /categories -  Must be able to list all categories", async () => {
		const response = await request(app).get("/categories");

		expect(response.body).toHaveLength(1);
		expect(response.status).toBe(200);
	});

	test("PATCH /categories/:id - should be able to update category", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);
		const categoryTobeUpdate = await request(app).get("/categories");

		const response = await request(app)
			.patch(`/categories/${categoryTobeUpdate.body[0].id}`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockCategoryUpdate);

		expect(response.status).toBe(200);
		expect(response.body.name).toEqual(mockCategoryUpdate.name);
	});

	test("PATCH /categories/:id -  should not be able to update category with empty field", async () => {
		const admLogin = await request(app).post("/login").send(mockAdmLogin);
		const categoryTobeUpdate = await request(app).get("/categories");

		const response = await request(app)
			.patch(`/categories/${categoryTobeUpdate.body[0].id}`)
			.set("Authorization", `Bearer ${admLogin.body.token}`)
			.send({ name: "" });

		const mockError = { errors: response.body.error };
		expect(response.status).toBe(400);
		expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
	});

	test("PATCH /categories/:id - should not be able to update category without authentication", async () => {
		const categoryTobeUpdate = await request(app).get("/categories");

		const response = await request(app)
			.patch(`/categories/${categoryTobeUpdate.body[0].id}`)
			.send(mockCategoryUpdate);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("PATCH /categories/:id - should not be able to update category not being admin", async () => {
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);
		const categoryTobeUpdate = await request(app).get("/categories");
		const response = await request(app)
			.patch(`/categories/${categoryTobeUpdate.body[0].id}`)
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`)
			.send(mockCategoryUpdate);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);
	});

	test("PATCH /categories/:id - should not be able to update with invalid id", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.patch(`/categories/6620d602-dcdb-4f4a-9105-70e3cd7fe953`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockCategoryUpdate);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	});

	test("PATCH /categories/:id - should not be able to update id field value", async () => {
		const categoryTobeUpdate = await request(app).get("/categories");
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.patch(`/categories/${categoryTobeUpdate.body[0].id}`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send({
				...mockCategoryUpdate,
				id: "6620d602-dcdb-4f4a-9105-70e3cd7fe953"
			});

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("DELETE /categories/:id - should not be able to delete category without authentication", async () => {
		const categoryTobeDelete = await request(app).get("/categories");

		const response = await request(app).delete(
			`/categories/${categoryTobeDelete.body[0].id}`
		);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("DELETE /categories/:id - should not be able to delete category not being admin", async () => {
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);
		const categoryToBeDelete = await request(app).get("/categories");

		const response = await request(app)
			.delete(`/categories/${categoryToBeDelete.body[0].id}`)
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);
	});

	test("DELETE /categories/:id - should not be able to delete with invalid id", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.delete(`/categories/6620d602-dcdb-4f4a-9105-70e3cd7fe953`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	});

	test("DELETE /categories/:id - should be able to delete category", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);
		const categoryTobeDelete = await request(app).get("/categories");

		const response = await request(app)
			.delete(`/categories/${categoryTobeDelete.body[0].id}`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`);

		expect(response.status).toBe(204);
	});
});
