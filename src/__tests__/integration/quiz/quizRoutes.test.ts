import request from "supertest";
import { DataSource } from "typeorm";
import { ValidationError } from "yup";
import { app } from "../../../app";
import dataSourceConfig from "../../../data-source";
import { Quizzes } from "../../../entities/quizzes.entity";
import { mockQuiz, mockQuizUpdate } from "../../mocks/quizzes.mock";
import {
	mockAdm,
	mockAdmLogin,
	mockUser,
	mockUserLogin
} from "../../mocks/users.mocks";

describe("/quizzes", () => {
	let connection: DataSource;

	beforeAll(async () => {
		await dataSourceConfig
			.initialize()
			.then(res => (connection = res))
			.catch(err => console.error(err));
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("POST /quizzes - Must be able to create a Quiz", async () => {
		await request(app).post("/users").send(mockAdm);
		const admResp = await request(app).post("/login").send(mockAdmLogin);
		const response = await request(app)
			.post("/quizzes")
			.set("Authorization", `Bearer ${admResp.body.token}`)
			.send(mockQuiz);
		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("name");
		expect(response.body).toHaveProperty("isActive");
		expect(response.body).toHaveProperty("deletedAt");
		expect(response.body.name).toEqual("Terra");
		expect(response.status).toBe(201);
	});

	test("POST /quizzes - Shouldn't be able to create a Quiz that already exists", async () => {
		const admResp = await request(app).post("/login").send(mockAdmLogin);
		const response = await request(app)
			.post("/quizzes")
			.set("Authorization", `Bearer ${admResp.body.token}`)
			.send(mockQuiz);
		expect(response.status).toBe(409);
		expect(response.body).toHaveProperty("message");
	});

	test("POST /quizzes - Shouldn't be able to create a quiz without authorization", async () => {
		const response = await request(app).post("/quizzes").send(mockQuiz);
		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("POST /quizzes - Only adms should be able to create a quiz", async () => {
		await request(app).post("/users").send(mockUser);
		const responseLogin = await request(app).post("/login").send(mockUserLogin);
		const response = await request(app)
			.post("/quizzes")
			.set("Authorization", `Bearer ${responseLogin.body.token}`)
			.send(mockQuiz);
		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);
	});

	test("POST /quizzes - Shouldn't be able to create a quiz with empty field", async () => {
		const admin = await request(app).post("/login").send(mockAdmLogin);
		const response = await request(app)
			.post("/quizzes")
			.set("Authorization", `Bearer ${admin.body.token}`)
			.send({ name: "" });
		const ErrorBody = { errors: response.body.error };
		expect(response.status).toBe(400);
		expect(ErrorBody).toMatchObject<Partial<ValidationError>>(ErrorBody);
	});

	test("GET /quizzes - Should be able to list quizzes", async () => {
		await request(app).post("/users").send(mockAdm);
		const login = await request(app).post("/login").send(mockAdmLogin);
		const response = await request(app)
			.get("/quizzes")
			.set("Authorization", `Bearer ${login.body.token}`);
		expect(response.body).toHaveLength(1);
		expect(response.status).toBe(201);
	});

	test("GET /quizzes - Shouldn't be able to list quizzes without authentication", async () => {
		const response = await request(app).get("/quizzes");
		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("GET /quizzes - Only adms should be able to list quizzes", async () => {
		await request(app).post("/users").send(mockUser);
		const login = await request(app).post("/login").send(mockUserLogin);
		const response = await request(app)
			.get("/quizzes")
			.set("Authorization", `Bearer ${login.body.token}`);
		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);
	});

	test("PATCH /quizzes/:id - Should be able to update a quiz", async () => {
		const admin = await request(app).post("/login").send(mockAdmLogin);
		const quizUpdated = await request(app)
			.get("/quizzes")
			.set("Authorization", `Bearer ${admin.body.token}`);
		const response = await request(app)
			.patch(`/quizzes/${quizUpdated.body[0].id}`)
			.set("Authorization", `Bearer ${admin.body.token}`)
			.send(mockQuizUpdate);

		expect(response.status).toBe(200);
		expect(response.body.name).toEqual(mockQuizUpdate.name);
	});

	test("PATCH /quizzes/:id - Shouldn't be able to update a quiz without authentication", async () => {
		const admResp = await request(app).post("/login").send(mockAdmLogin);
		const quizUpdated = await request(app)
			.get("/quizzes")
			.set("Authorization", `Bearer ${admResp.body.token}`);
		const response = await request(app).patch(
			`/quizzes/${quizUpdated.body[0].id}`
		);
		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("PATCH /quizzes/:id - Shouldn't be able to update a quiz with invalid id", async () => {
		const admin = await request(app).post("/login").send(mockAdmLogin);

		const response = await request(app)
			.patch(`/quizzes/b8681329-9097-4238-b8e6-a80fb1e87a80`)
			.set("Authorization", `Bearer ${admin.body.token}`)
			.send(mockQuizUpdate);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	});

	test("PATCH /quizzes/:id - Only admins should be able to update a quiz", async () => {
		const admResp = await request(app).post("/login").send(mockAdmLogin);
		const login = await request(app).post("/login").send(mockUserLogin);
		const quizUpdated = await request(app)
			.get("/quizzes")
			.set("Authorization", `Bearer ${admResp.body.token}`);
		const response = await request(app)
			.patch(`/quizzes/${quizUpdated.body[0].id}`)
			.set("Authorization", `Bearer ${login.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);
	});

	test("PATCH /quizzes/:id - Shouldn't be able to update a quiz with empty field", async () => {
		const admResp = await request(app).post("/login").send(mockAdmLogin);
		const login = await request(app).post("/login").send(mockAdmLogin);
		const quizUpdated = await request(app)
			.get("/quizzes")
			.set("Authorization", `Bearer ${admResp.body.token}`);
		const response = await request(app)
			.patch(`/quizzes/${quizUpdated.body[0].id}`)
			.set("Authorization", `Bearer ${login.body.token}`)
			.send({ name: "" });
		const Error = { errors: response.body.error };
		expect(response.status).toBe(400);
		expect(Error).toMatchObject(<Partial<ValidationError>>Error);
	});

	test("PATCH /quizzes/:id - Shouldn't be able to update id", async () => {
		const login = await request(app).post("/login").send(mockAdmLogin);
		const quizUpdated = await request(app)
			.get("/quizzes")
			.set("Authorization", `Bearer ${login.body.token}`);
		const response = await request(app)
			.patch(`/quizzes/${quizUpdated.body[0].id}`)
			.set("Authorization", `Bearer ${login.body.token}`)
			.send({ ...mockQuizUpdate, id: "b8681329-9097-4238-b8e6-a80fb1e87a80" });
		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("DELETE /quizzess/:id - Should be able to delete a quiz", async () => {
		const admResp = await request(app).post("/login").send(mockAdmLogin);
		const quizDeleted = await request(app)
			.get("/quizzes")
			.set("Authorization", `Bearer ${admResp.body.token}`);
		const response = await request(app)
			.delete(`/quizzes/${quizDeleted.body[0].id}`)
			.set("Authorization", `Bearer ${admResp.body.token}`);
		expect(response.status).toBe(204);
	});

	test("DELETE /quizzes/:id - Shouldn't be able to delete a quiz without authentication", async () => {
		const admResp = await request(app).post("/login").send(mockAdmLogin);
		const quizDeleted = await request(app)
			.get("/quizzes")
			.set("Authorization", `Bearer ${admResp.body.token}`);
		const response = await request(app).delete(
			`/quizzes/${quizDeleted.body[0].id}`
		);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("DELETE /quizzes/:id - Shouldn't be able to delete a quiz with a invalid id", async () => {
		const admResp = await request(app).post("/login").send(mockAdmLogin);
		const quizDeleted = await request(app)
			.get("/quizzes")
			.set("Authorization", `Bearer ${admResp.body.token}`);
		const response = await request(app)
			.delete(`/quizzes/b8681329-9097-4238-b8e6-a80fb1e87a80`)
			.set("Authorization", `Bearer ${admResp.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	});

	test("DELETE /quizzes/:id - Only adms should be able to delete quiz", async () => {
		const admResp = await request(app).post("/login").send(mockAdmLogin);
		const login = await request(app).post("/login").send(mockUserLogin);
		const quizDeleted = await request(app)
			.get("/quizzes")
			.set("Authorization", `Bearer ${admResp.body.token}`);
		const response = await request(app)
			.delete(`/quizzes/${quizDeleted.body[0].id}`)
			.set("Authorization", `Bearer ${login.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);
	});
});
