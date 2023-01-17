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

    /*
    test("GET /questions/:id -  Must be able to list question",async () => {
      
        const question = await request(app).get('/questions')
        const response = await request(app).get(`/questions/${question.body[0].id}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("question")
        
    })

    /*test("GET /categories/:id/properties -  Should not be able to list properties of a category with invalid id",async () => {
      
        const response = await request(app).get(`/categories/13970660-5dbe-423a-9a9d-5c23b37943cf/properties`)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
        
    })*/

    test("PATCH /questions/:id -  should be able to update questions",async () => {
        const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);
		const categoryTobeUpdate = await request(app).get("/questions");

		const response = await request(app)
			.patch(`/categories/${categoryTobeUpdate.body[0].id}`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockQuestionEdit);

		expect(response.status).toBe(200);
		expect(response.body.question).toEqual(mockQuestionEdit.question);
    })

    test("PATCH /questions/:id - should not be able to update questions without authentication", async () => {
		const questionTobeUpdate = await request(app).get("/questions");

		const response = await request(app)
			.patch(`/questions/${questionTobeUpdate.body[0].id}`)
			.send(mockQuestionEdit);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
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
		const categoryTobeUpdate = await request(app).get("/questions");
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.patch(`/questions/${categoryTobeUpdate.body[0].id}`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send({
				...mockQuestionEdit,
				id: "6620d602-dcdb-4f4a-9105-70e3cd7fe953"
			});

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	})

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
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdm);
		const questionTobeDelete = await request(app).get("/questions");

		const response = await request(app)
			.delete(`/questions/${questionTobeDelete.body[0].id}`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`);

		expect(response.status).toBe(204);
	}) 

})