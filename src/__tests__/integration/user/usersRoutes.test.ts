import { DataSource } from "typeorm";
import dataSourceConfig from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import { mockAdm, mockAdmLogin } from "../../mocks";

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

  test("GET /users -  Must be able to list users", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).not.toHaveProperty("password");
  });

  test("GET /users -  shouldn't be able to list users without authentication", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
