import {
  mockCantCreateMoreOption,
  mockCantCreateOptionFalseByPointEqual2,
  mockCantCreateOptionTrueByPointEqual0,
  mockCreateOptionFalse01,
  mockCreateOptionFalse02,
  mockCreateOptionFalse03,
  mockCreateOptionTrue,
} from "./../../mocks/options.mock";
import { DataSource } from "typeorm";
import dataSource from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import { mockAdm, mockAdmLogin } from "../../mocks/users.mocks";

describe("/options", () => {
  let connect: DataSource;

  beforeAll(async () => {
    await dataSource
      .initialize()
      .then((res) => (connect = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connect.destroy();
  });

  test("POST /optons Shold be able to create a new option", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);

    const response = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(mockCreateOptionTrue);

    expect(response.status).toBe(201);
    expect(response.body).toContain({
      ...mockCreateOptionTrue,
      id: response.body.id,
    });
  });

  test("POST /options Shold be create other options", async () => {
    const response = await request(app)
      .post("/options")
      .send(mockCreateOptionFalse01);

    expect(response.status).toBe(201);
    expect(response.body).toContain({
      ...mockCreateOptionFalse01,
      id: response.body.id,
    });
  });

  test("POST /options Shold be create other options", async () => {
    const response = await request(app)
      .post("/options")
      .send(mockCreateOptionFalse02);

    expect(response.status).toBe(201);
    expect(response.body).toContain({
      id: response.body.id,
      ...mockCreateOptionFalse02,
    });
  });

  test("POST /options Shold be create other options", async () => {
    const response = await request(app)
      .post("/options")
      .send(mockCreateOptionFalse03);

    expect(response.status).toBe(201);
    expect(response.body).toContain({
      id: response.body.id,
      ...mockCreateOptionFalse03,
    });
  });

  test("POST /options Cant create false option can point equal 2", async () => {
    const response = await request(app)
      .post("/options")
      .send(mockCantCreateOptionFalseByPointEqual2);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /options Cant create true option can point equal 0", async () => {
    const response = await request(app)
      .post("/options")
      .send(mockCantCreateOptionTrueByPointEqual0);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /options Cant create more options", async () => {
    const response = await request(app)
      .post("/options")
      .send(mockCantCreateMoreOption);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
