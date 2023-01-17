import { DataSource } from "typeorm";
import dataSourceConfig from "../../../data-source";
import request from "supertest"
import { app } from "../../../app";
import { mockTypes, mockTypesUpdate } from "../../mocks/types.mocks";
import {
    mockAdm,
    mockAdmLogin,
    mockUser,
    mockUserLogin,
  } from "../../mocks/users.mocks";


describe("/types", () => {
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

    test("POST /types -  Must be able to create a type",async () => {
        await request(app).post("/users").send(mockAdm);
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);
		const response = await request(app)
			.post("/types")
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockTypes);

        expect(response.status).toBe(201)
		expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("id"); 

    })

    test("POST /types - Should not be able to create a type that already exists",async () => {
        const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.post("/types")
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockTypes);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(409);
     
    })

    test("POST /types -  should not be able to create types without authentication",async () => {
        const response = await request(app).post('/types').send(mockTypes)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("POST /types - should not be able to create types not being admin",async () => {
        await request(app).post("/users").send(mockUser);
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);

		const response = await request(app)
			.post("/types")
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`)
			.send(mockTypes);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(403);             
    })

    test("GET /types -  Must be able to list all types",async () => {
        await request(app).post("/users").send(mockUser);
		const userLoginResponse = await request(app)
			.post("/login")
			.send(mockUserLogin);

		const response = await request(app)
			.get("/types")
			.set("Authorization", `Bearer ${userLoginResponse.body.token}`);

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
     
    })

    test("PATCH /types/:id -  should be able to update types",async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const userToBeUpdated = await request(app)
        .get("/types")
        .set("Authorization", `Bearer ${admLogin.body.token}`);
        const response = await request(app)
        .patch(`/types/${userToBeUpdated.body[0].id}`)
        .set("Authorization", `Bearer ${admLogin.body.token}`)
        .send(mockTypesUpdate);

        expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("id"); 

    })

    test("PATCH /types/:id - should not be able to update types without authentication", async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const updatedUser = await request(app)
        .get("/types")
        .set("Authorization", `Bearer ${admLogin.body.token}`);
        const res = await request(app).patch(`/types/${updatedUser.body[0].id}`);
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
	})

    test("PATCH /types/:id -  should not be able to update types not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockUser);
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const userTobeUpdate = await request(app).get('/types').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).patch(`/types/${userTobeUpdate.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("PATCH /types/:id - should not be able to update types with invalid id", async () => {
		const admLoginResponse = await request(app)
			.post("/login")
			.send(mockAdmLogin);

		const response = await request(app)
			.patch(`/types/6620d602-dcdb-4f4a-9105-70e3cd7fe953`)
			.set("Authorization", `Bearer ${admLoginResponse.body.token}`)
			.send(mockTypesUpdate);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	})

	test("PATCH /types/:id - should not be able to update id field value", async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const userToBeUpdated = await request(app)
        .get("/types")
        .set("Authorization", `Bearer ${admLogin.body.token}`);

        const valuesToBeUpdated = { id: "123", name: "123" };
        const res = await request(app)
        .patch(`/types/${userToBeUpdated.body[0].id}`)
        .set("Authorization", `Bearer ${admLogin.body.token}`)
        .send(valuesToBeUpdated);

        console.log(res.body)
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
	})

    test("DELETE /types/:id - Shouldn't be able to delete types without authentication", async () => {
        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const UserTobeDeleted = await request(app)
          .get("/types")
          .set("Authorization", `Bearer ${admLogin.body.token}`);
        const res = await request(app).delete(
          `/types/${UserTobeDeleted.body[0].id}`
        );
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
    });

    test("DELETE /types/:id -  should not be able to delete types not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockUser);
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const UserTobeDeleted = await request(app).get('/types').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/types/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("DELETE /types/:id -  should not be able to delete type with invalid id",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const response = await request(app).delete(`/types/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })

    test("DELETE /types/:id - should be able to delete type", async () => {

        const admLogin = await request(app).post("/login").send(mockAdmLogin);
        const userToBeUpdated = await request(app)
        .get("/types")
        .set("Authorization", `Bearer ${admLogin.body.token}`);
        const response = await request(app)
        .delete(`/types/${userToBeUpdated.body[0].id}`)
        .set("Authorization", `Bearer ${admLogin.body.token}`);

		expect(response.status).toBe(204);
	});

})
