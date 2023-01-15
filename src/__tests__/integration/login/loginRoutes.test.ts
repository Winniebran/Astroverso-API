import { DataSource } from "typeorm";
import dataSourceConfig from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import { mockAdm, mockAdmLogin } from "../../mocks/users.mocks";

describe("/login", () => {
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

    await request(app).post("/users").send(mockAdm);
  });

  test("POST /login - Should be able to login", async () => {
    const res = await request(app).post("/login").send(mockAdmLogin);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /login - Shouldn't be able to login with incorrect password or email", async () => {
    const res = await request(app).post("/login").send({
      email: "kenzinho10@mail.com",
      password: "1234",
    });
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });
});
