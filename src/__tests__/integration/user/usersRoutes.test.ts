import { DataSource } from "typeorm";
import dataSourceConfig from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import {
  mockAdm,
  mockAdmLogin,
  mockUser,
  mockUser2,
  mockUser3,
  mockUserLogin,
} from "../../mocks/users.mocks";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await dataSourceConfig
      .initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /users - Must be able to list users", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).not.toHaveProperty("password");
  });

  test("GET /users - Shouldn't be able to list users without authentication", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("GET /users - Shouldn't be able to list users not being admin", async () => {
    await request(app).post("/users").send(mockUser);
    const userLogin = await request(app).post("/login").send(mockUserLogin);
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });

  // GET /users/:id/favoritePosts

  //   test("GET /users/:id/favoritePosts - Shouldn't be able to list favorite posts without authentication", async () => {
  //     const userLogin = await request(app).post("/login").send(mockUserLogin);
  //     const loggedUSer = await request(app)
  //       .get("/users")
  //       .set("Authorization", `Bearer ${userLogin.body.token}`);
  //     const res = await request(app).get(
  //       `/users/${loggedUSer.body[0].id}/favoritePosts`
  //     );
  //     expect(res.status).toBe(401);
  //     expect(res.body).toHaveProperty("message");
  //   });

  // POST /users

  test("POST /users - Must be able to create a user", async () => {
    const res = await request(app).post("/users").send(mockUser2);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("isAdm");
    expect(res.body).toHaveProperty("score");
    expect(res.body).toHaveProperty("isActive");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
    expect(res.body).not.toHaveProperty("password");
    expect(res.body.name).toEqual("João");
    expect(res.body.email).toEqual("joao@mail.com");
    expect(res.body.isAdm).toEqual(false);
    expect(res.status).toBe(201);
  });

  test("POST /users - Shouldn't be able to create a user that already exists", async () => {
    const res = await request(app).post("/users").send(mockUser);
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message");
  });

  // DELETE /users/:id
  test("DELETE /users/:id -  Shouldn't be able to delete user without authentication", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const res = await request(app).delete(
      `/users/${UserTobeDeleted.body[0].id}`
    );
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("DELETE /users/:id -  Shouldn't be able to delete user without admin permission", async () => {
    const userLogin = await request(app).post("/login").send(mockUserLogin);
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });

  test("DELETE /users/:id -  Must be able to soft delete user", async () => {
    await request(app).post("/users").send(mockUser3);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const res = await request(app)
      .delete(`/users/${UserTobeDeleted.body[3].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    expect(res.status).toBe(204);
    expect(findUser.body[3].isActive).toBe(false);
  });

  test("DELETE /users/:id -  Shouldn't be able to delete user with isActive = false", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const res = await request(app)
      .delete(`/users/${UserTobeDeleted.body[3].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  test("DELETE /users/:id -  Shouldn't be able to delete user with invalid id", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const res = await request(app)
      .delete(`/users/1`)
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message");
  });

  // UPDATE /users/:id

  test("PATCH /users/:id - Shouldn't be able to update user without authentication", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const updatedUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const res = await request(app).patch(`/users/${updatedUser.body[0].id}`);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Shouldn't be able to update another user without admin permission", async () => {
    const userLogin = await request(app).post("/login").send(mockUserLogin);
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Should be able to update another user with admin permission", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const valuesToBeUpdated = { name: "Daniel", email: "daniel@mail.com" };
    const userToBeUpdated = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const res = await request(app)
      .patch(`/users/${userToBeUpdated.body[2].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(valuesToBeUpdated);

    const updatedUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    expect(res.status).toBe(200);
    expect(updatedUser.body[2].name).toEqual("Daniel");
    expect(updatedUser.body[2].email).toEqual("daniel@mail.com");
    expect(updatedUser.body[2]).not.toHaveProperty("password");
  });

  test("PATCH /users/:id - Shouldn't be able to update user with invalid id", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const valuesToBeUpdated = { name: "Daniel", email: "daniel@mail.com" };
    const res = await request(app)
      .patch(`/users/1`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(valuesToBeUpdated);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Shouldn't be able to update isAdm field value", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const userToBeUpdated = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const valuesToBeUpdated = { isAdm: false };
    const res = await request(app)
      .patch(`/users/${userToBeUpdated.body[0].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(valuesToBeUpdated);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Shouldn't be able to update isActive field value", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const userToBeUpdated = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const valuesToBeUpdated = { isActive: false };
    const res = await request(app)
      .patch(`/users/${userToBeUpdated.body[0].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(valuesToBeUpdated);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Shouldn't be able to update score field value", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const userToBeUpdated = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const valuesToBeUpdated = { score: 100 };
    const res = await request(app)
      .patch(`/users/${userToBeUpdated.body[0].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(valuesToBeUpdated);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Shouldn't be able to update id field value", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const userToBeUpdated = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const valuesToBeUpdated = { id: 1 };
    const res = await request(app)
      .patch(`/users/${userToBeUpdated.body[0].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(valuesToBeUpdated);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Should be able to update user", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const userToBeUpdated = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const valuesToBeUpdated = { name: "Admin", email: "admin@mail.com" };
    const res = await request(app)
      .patch(`/users/${userToBeUpdated.body[0].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(valuesToBeUpdated);

    const updatedUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    expect(res.status).toBe(200);
    expect(updatedUser.body[0].name).toEqual("Admin");
    expect(updatedUser.body[0].email).toEqual("admin@mail.com");
    expect(updatedUser.body[0]).not.toHaveProperty("password");
  });
});
