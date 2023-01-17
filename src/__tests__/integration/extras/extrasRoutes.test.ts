import { DataSource } from "typeorm";
import dataSourceConfig from "../../../data-source";
import request from "supertest"
import { app } from "../../../app";
import { mockExtras, mockExtrasUpdate } from "../../mocks/extras.mocks";
import {
    mockAdm,
    mockAdmLogin,
    mockUser,
    mockUserLogin,
  } from "../../mocks/users.mocks";
import { mockTypes } from "../../mocks/types.mocks";


describe("/extras", () => {
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

    test("POST /extras -  Must be able to create an extra",async () => {
        await request(app).post("/users").send(mockAdm);
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);


            const typeResponse = await request(app)
            .post("/types")
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockTypes);



		const response = await request(app)
			.post("/extras")
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send({ ...mockExtras, typesId: typeResponse.body.id });

        expect(response.body).toHaveProperty("image")
        expect(response.body).toHaveProperty("author")
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("link")
        expect(response.body).toHaveProperty("types")

        expect(response.status).toBe(201)
     
    })

    test("POST /extras - Should not be able to create a extra that already exists",async () => {
        const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.post("/extras")
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockExtras);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(409);
     
    })

    test("POST /extras -  should not be able to create extras without authentication",async () => {
        const response = await request(app).post('/extras').send(mockExtras)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("POST /extras - should not be able to create extras not being admin",async () => {
        await request(app).post("/users").send(mockUser);
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);

		const response = await request(app)
			.post("/extras")
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`)
			.send(mockExtras);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);             
    })

    test("GET /extras -  Must be able to list all extras",async () => {
        await request(app).post("/users").send(mockUser);
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);

		const response = await request(app)
			.get("/extras")
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`);

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
     
    })

    test("PATCH /extras/:id -  should be able to update extras",async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const userToBeUpdated = await request(app)
        .get("/extras")
        .set("Authorization", `Bearer ${admLogin.body.token}`);
        const response = await request(app)
        .patch(`/extras/${userToBeUpdated.body[0].id}`)
        .set("Authorization", `Bearer ${admLogin.body.token}`)
        .send(mockExtrasUpdate);

        expect(response.status).toBe(200);
        //?
		expect(response.body).toEqual(mockExtrasUpdate); 
        //?
    })

    test("PATCH /extras/:id - should not be able to update extras without authentication", async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const updatedUser = await request(app)
        .get("/extras")
        .set("Authorization", `Bearer ${admLogin.body.token}`);
        const res = await request(app).patch(`/extras/${updatedUser.body[0].id}`);
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
	})

    test("PATCH /extras/:id -  should not be able to update extras not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockUser);
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const userTobeUpdate = await request(app).get('/extras').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).patch(`/extras/${userTobeUpdate.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("PATCH /extras/:id - should not be able to update extras with invalid id", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.patch(`/extras/6620d602-dcdb-4f4a-9105-70e3cd7fe953`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockExtrasUpdate);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	})

	test("PATCH /extras/:id - should not be able to update id field value", async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const userToBeUpdated = await request(app)
        .get("/extras")
        .set("Authorization", `Bearer ${admLogin.body.token}`);

        const valuesToBeUpdated = { id: '123' };
        const res = await request(app)
        .patch(`/extras/${userToBeUpdated.body[0].id}`)
        .set("Authorization", `Bearer ${admLogin.body.token}`)
        .send(valuesToBeUpdated);

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
	})

    test("DELETE /extras/:id - Shouldn't be able to delete extras without authentication", async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const UserTobeDeleted = await request(app)
          .get("/extras")
          .set("Authorization", `Bearer ${admLogin.body.token}`);
        const res = await request(app).delete(
          `/extras/${UserTobeDeleted.body[0].id}`
        );
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
    });

    test("DELETE /extras/:id -  should not be able to delete extras not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockUser);
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const UserTobeDeleted = await request(app).get('/extras').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/extras/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("DELETE /extras/:id -  should not be able to delete extras with invalid id",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const response = await request(app).delete(`/extras/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })

    test("DELETE /extras/:id - should be able to delete an extra", async () => {

        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const userToBeUpdated = await request(app)
        .get("/extras")
        .set("Authorization", `Bearer ${admLogin.body.token}`);
        const response = await request(app)
        .delete(`/extras/${userToBeUpdated.body[0].id}`)
        .set("Authorization", `Bearer ${admLogin.body.token}`);

		expect(response.status).toBe(204);
	});
})
