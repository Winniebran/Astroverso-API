import { DataSource } from "typeorm";
import dataSourceConfig from "../../../data-source";
import request from "supertest"
import { ValidationError } from "yup";
import { app } from "../../../app";
import { mockQuestion, mockQuestionEdit } from "../../mocks/questions.mocks";
import {
    mockAdm,
    mockAdmLogin,
    mockUser,
    mockUserLogin,
  } from "../../mocks/users.mocks";


describe("/questions", () => {
    let connection: DataSource

    beforeAll(async() => {
        await dataSourceConfig.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /questions -  Must be able to create question",async () => {
        await request(app).post("/users").send(mockAdm);
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);
		const response = await request(app)
			.post("/questions")
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockQuestion);

        expect(response.body).toHaveProperty("question")
        expect(response.status).toBe(201)
     
    })

    test("POST /questions - Should not be able to create question that already exists",async () => {
        const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.post("/questions")
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockQuestion);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(409);
     
    })

    test("POST /questions -  should not be able to create questions without authentication",async () => {
        const response = await request(app).post('/questions').send(mockQuestion)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("POST /questions - should not be able to create questions not being admin",async () => {
        await request(app).post("/users").send(mockUser);
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);

		const response = await request(app)
			.post("/questions")
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`)
			.send(mockQuestion);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);             
    })

    test("GET /questions -  Must be able to list all questions",async () => {
        await request(app).post("/users").send(mockUser);
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);

		const response = await request(app)
			.get("/questions")
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`);

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
     
    })

    test("PATCH /questions/:id -  should be able to update questions",async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const userToBeUpdated = await request(app)
        .get("/questions")
        .set("Authorization", `Bearer ${admLogin.body.token}`);
        const response = await request(app)
        .patch(`/questions/${userToBeUpdated.body[0].id}`)
        .set("Authorization", `Bearer ${admLogin.body.token}`)
        .send(mockQuestionEdit);

        expect(response.status).toBe(200);
		expect(response.body.question).toEqual(mockQuestionEdit.question);
    })

    test("PATCH /questions/:id - should not be able to update questions without authentication", async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const updatedUser = await request(app)
        .get("/questions")
        .set("Authorization", `Bearer ${admLogin.body.token}`);
        const res = await request(app).patch(`/questions/${updatedUser.body[0].id}`);
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
	})

    test("PATCH /questions/:id -  should not be able to update questions not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockUser);
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const userTobeUpdate = await request(app).get('/questions').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).patch(`/questions/${userTobeUpdate.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("PATCH /questions/:id - should not be able to update questions with invalid id", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.patch(`/questions/6620d602-dcdb-4f4a-9105-70e3cd7fe953`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockQuestionEdit);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	})

	test("PATCH /questions/:id - should not be able to update id field value", async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const userToBeUpdated = await request(app)
        .get("/questions")
        .set("Authorization", `Bearer ${admLogin.body.token}`);

        const valuesToBeUpdated = { id: '123' };
        const res = await request(app)
        .patch(`/questions/${userToBeUpdated.body[0].id}`)
        .set("Authorization", `Bearer ${admLogin.body.token}`)
        .send(valuesToBeUpdated);

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
	})

    test("DELETE /questions/:id - Shouldn't be able to delete user without authentication", async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const UserTobeDeleted = await request(app)
          .get("/questions")
          .set("Authorization", `Bearer ${admLogin.body.token}`);
        const res = await request(app).delete(
          `/questions/${UserTobeDeleted.body[0].id}`
        );
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
    });

    test("DELETE /questions/:id -  should not be able to delete questions not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockUser);
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const UserTobeDeleted = await request(app).get('/questions').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/questions/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("DELETE /questions/:id -  should not be able to delete questions with invalid id",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const response = await request(app).delete(`/questions/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })

    test("DELETE /questions/:id - should be able to delete category", async () => {

        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const userToBeUpdated = await request(app)
        .get("/questions")
        .set("Authorization", `Bearer ${admLogin.body.token}`);
        const response = await request(app)
        .delete(`/questions/${userToBeUpdated.body[0].id}`)
        .set("Authorization", `Bearer ${admLogin.body.token}`);

		expect(response.status).toBe(204);
	});

})