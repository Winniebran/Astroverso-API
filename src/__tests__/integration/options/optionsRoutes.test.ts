import {
  mockCantCreateMoreOption,
  mockCantCreateOptionFalseByPointEqual2,
  mockCantCreateOptionTrueByPointEqual0,
  mockCreateOptionFalse01,
  mockCreateOptionFalse02,
  mockCreateOptionFalse03,
  mockCreateOptionTrue,
} from "../../mocks/options.mock";
import { DataSource } from "typeorm";
import dataSource from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import { mockAdm, mockAdmLogin } from "../../mocks/users.mocks";
import { mockQuestion } from "../../mocks/questions.mocks";
import { IOptions } from "../../../interfaces/options";

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
    const question = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(mockQuestion);
    const questionId = question.body.id;

    const { answer, point, isCorrect } = mockCreateOptionTrue;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const response = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("answer");
    expect(response.body).toHaveProperty("point");
    expect(response.body).toHaveProperty("isCorrect");
    expect(response.body).toHaveProperty("id");
  });

  test("POST /options Cant create false option can point equal 2", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const questionId = question.body[0].id;

    const { answer, point, isCorrect } = mockCantCreateOptionFalseByPointEqual2;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const response = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /options Cant create true option can point equal 0", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const questionId = question.body[0].id;

    const { answer, point, isCorrect } = mockCantCreateOptionTrueByPointEqual0;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const response = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /options Shold be create other options", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const questionId = question.body[0].id;

    const { answer, point, isCorrect } = mockCreateOptionFalse01;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const response = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("answer");
    expect(response.body).toHaveProperty("point");
    expect(response.body).toHaveProperty("isCorrect");
    expect(response.body).toHaveProperty("id");
  });

  test("POST /options Shold be create other options", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const questionId = question.body[0].id;

    const { answer, point, isCorrect } = mockCreateOptionFalse02;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const response = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("answer");
    expect(response.body).toHaveProperty("point");
    expect(response.body).toHaveProperty("isCorrect");
    expect(response.body).toHaveProperty("id");
  });

  test("POST /options Shold be create other options", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const questionId = question.body[0].id;

    const { answer, point, isCorrect } = mockCreateOptionFalse03;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const response = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("answer");
    expect(response.body).toHaveProperty("point");
    expect(response.body).toHaveProperty("isCorrect");
    expect(response.body).toHaveProperty("id");
  });

  test("POST /options Cant create more options", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const questionId = question.body[0].id;

    const { answer, point, isCorrect } = mockCantCreateMoreOption;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const response = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
