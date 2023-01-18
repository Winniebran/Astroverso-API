import {
  mockCantCreateMoreOption,
  mockCantCreateOptionFalseByPointEqual2,
  mockCantCreateOptionTrueByPointEqual0,
  mockCreateOptionFalse01,
  mockCreateOptionFalse02,
  mockCreateOptionFalse03,
  mockCreateOptionTrue,
  mockUpdateOptionTrue,
} from "../../mocks/options.mock";
import { DataSource } from "typeorm";
import dataSource from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import {
  mockAdm,
  mockAdmLogin,
  mockUser,
  mockUserLogin,
} from "../../mocks/users.mocks";
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

  test("POST /options - Cant create option not ADM", async () => {
    await request(app).post("/users").send(mockUser);
    const admLogin = await request(app).post("/login").send(mockUserLogin);
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

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /optons - Cant create option is invalid token", async () => {
    const question = await request(app).post("/questions").send(mockQuestion);
    const questionId = question.body.id;

    const { answer, point, isCorrect } = mockCreateOptionTrue;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const response = await request(app).post("/options").send(data);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /optons - Shold be able to create a new option", async () => {
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

  test("POST /optons - Cant create a option already exists", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const data: IOptions = {
      ...mockCreateOptionTrue,
      questionsId: question.body[0].id,
    };

    const response = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /options - Cant create false option can point equal 2", async () => {
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

  test("POST /options - Cant create true option can point equal 0", async () => {
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

  test("POST /options - Shold be create other options", async () => {
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

  test("POST /options - Shold be create other options", async () => {
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

  test("POST /options - Shold be create other options", async () => {
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

  test("POST /options - Cant create more options", async () => {
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

  test("GET /options - Cant get options without Authentication", async () => {
    await request(app).post("/users").send(mockAdm);

    const response = await request(app).get("/options");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /options - get all options", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);

    const response = await request(app)
      .get("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);
  });

  test("DELETE /options/:id - Can Delete option", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send({ question: "pergunta para deletar" });

    const questionId = question.body.id;

    const { answer, point, isCorrect } = mockCreateOptionTrue;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const option = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    const response = await request(app)
      .delete(`/options/${option.body.id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /options/:id - Cant Delete Option without Authentication", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const questionId = question.body[1].id;

    const { answer, point, isCorrect } = mockCreateOptionTrue;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const option = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    const response = await request(app).delete(`/options/${option.body.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /options/:id - Cant delete option if not adm", async () => {
    await request(app).post("/users").send(mockUser);
    const admLogin = await request(app).post("/login").send(mockUserLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const questionId = question.body[1].id;

    const { answer, point, isCorrect } = mockCreateOptionTrue;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const option = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    const response = await request(app)
      .delete(`/options/${option.body.id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /options/:id - Can update option", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const questionId = question.body[1].id;

    const { answer, point, isCorrect } = mockCreateOptionTrue;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const option = await request(app)
      .get("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const response = await request(app)
      .patch(`/options/${option.body[0].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(mockUpdateOptionTrue);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      answer: "option 1 updated",
      id: option.body[0].id,
      isCorrect: option.body[0].isCorrect,
      point: option.body[0].point,
    });
  });

  test("PATCH /options/:id - Cant update option if not is adm", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const questionId = question.body[1].id;

    const { answer, point, isCorrect } = mockCreateOptionTrue;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const option = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    const response = await request(app)
      .patch(`/options/${option.body.id}`)
      .send(mockUpdateOptionTrue);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /options/:id - Cant update option without Authentication", async () => {
    await request(app).post("/users").send(mockUser);
    const admLogin = await request(app).post("/login").send(mockUserLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const questionId = question.body[1].id;

    const { answer, point, isCorrect } = mockCreateOptionTrue;

    const data: IOptions = {
      answer,
      point,
      isCorrect,
      questionsId: questionId,
    };

    const option = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    const response = await request(app)
      .patch(`/options/${option.body.id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(mockUpdateOptionTrue);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
});
