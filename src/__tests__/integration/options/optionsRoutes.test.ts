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

  test("POST /options - Shouldn't be able to create options not being admin", async () => {
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

  test("POST /optons - Shouldn't be able to create options without authentication", async () => {
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

  test("POST /optons - Should be able to create a new option", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(mockQuestion);
    const questionId = question.body.id;

    const data: IOptions = {
      ...mockCreateOptionTrue,
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

  test("POST /options - Shouldn't be able to create a fake option with point equal to 2", async () => {
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

  test("POST /options - Shouldn't be able to create a true option with point equal to 0", async () => {
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

  test("POST /options - Should be able to create another options", async () => {
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

  test("POST /optons - Shouldn't be able to create options already exists", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const question = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const data: IOptions = {
      ...mockCreateOptionFalse01,
      questionsId: question.body[0].id,
    };

    const response = await request(app)
      .post("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send(data);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /options - Should be able to create another options", async () => {
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

  test("POST /options - Should be able to create another options", async () => {
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

  test("POST /options - Must not be able to create more than four options per question", async () => {
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

  test("GET /options - Shouldn't be able to list options without authentication", async () => {
    await request(app).post("/users").send(mockAdm);

    const response = await request(app).get("/options");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /options - Must be able to list all options", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLogin = await request(app).post("/login").send(mockAdmLogin);

    const response = await request(app)
      .get("/options")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);
  });

  test("DELETE /options/:id - Must be able to delete options", async () => {
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

  test("DELETE /options/:id - Shouldn't be able to delete options without authentication", async () => {
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

  test("DELETE /options/:id - Shouldn't be able to delete options without admin permission", async () => {
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

  test("PATCH /options/:id - Must be able to update options", async () => {
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

  test("PATCH /options/:id - Shouldn't be able to update options without admin permission", async () => {
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

  test("PATCH /options/:id - Shouldn't be able to update options without authentication", async () => {
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
