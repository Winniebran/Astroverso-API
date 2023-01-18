import { DataSource } from "typeorm";
import dataSourceConfig from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import {
  mockAdm,
  mockAdmLogin,
  mockUser,
  mockUserLogin,
} from "../../mocks/users.mocks";
import { mockQuiz } from "../../mocks/quizzes.mock";
import { mockQuestion } from "../../mocks/questions.mocks";
import { ValidationError } from "yup";

describe("/quizzes_collections", () => {
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
  test("POST /quizzes_collections - Must be able to create a quiz collection", async () => {
    await request(app).post("/users").send(mockAdm);
    const loginAdm = await request(app).post("/login").send(mockAdmLogin);

    const quizId = await request(app)
      .post("/quizzes")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send(mockQuiz);

    const questionId = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send(mockQuestion);

    const response = await request(app)
      .post("/quizzes_collections")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send({
        quizzesId: quizId.body.id,
        questionsId: questionId.body.id,
      });

    expect(response.body[0]).toHaveProperty("quizzes");
    expect(response.body[0]).toHaveProperty("questions");
    expect(response.body[0]).toHaveProperty("id");
    expect(response.status).toBe(201);
  });

  test("POST /quizzes_collections - Should not be able to create a quiz that already exists", async () => {
    const loginAdm = await request(app).post("/login").send(mockAdmLogin);
    const quizResponse = await request(app)
      .get("/quizzes")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    const questionResponse = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const response = await request(app)
      .post("/quizzes_collections")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send({
        quizzesId: quizResponse.body[0].id,
        questionsId: questionResponse.body[0].id,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /quizzes_collections - Should not be able to create a quiz collection without quiz", async () => {
    const loginAdm = await request(app).post("/login").send(mockAdmLogin);
    const questionResponse = await request(app).get("/questions");
    const response = await request(app)
      .post("/quizzes_collections")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send({
        quizzesId: "",
        questionsId: questionResponse.body.id,
      });

    const error = { errors: response.body.error };
    expect(response.status).toBe(400);
    expect(error).toMatchObject<Partial<ValidationError>>(error);
  });

  test("POST /quizzes_collections - Should not be able to create a quiz collection without questions", async () => {
    const loginAdm = await request(app).post("/login").send(mockAdmLogin);
    const quizResponse = await request(app)
      .get("/quizzes")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    const response = await request(app)
      .post("/quizzes_collections")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send({
        quizzesId: quizResponse.body[0].id,
        questionsId: "",
      });

    const error = { errors: response.body.error };
    expect(response.status).toBe(400);
    expect(error).toMatchObject<Partial<ValidationError>>(error);
  });

  test("POST /quizzes_collections - Should not be able to create a quiz collection without authorization", async () => {
    const loginAdm = await request(app).post("/login").send(mockAdmLogin);

    const quizResponse = await request(app)
      .get("/quizzes")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    const questionResponse = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const response = await request(app).post("/quizzes_collections").send({
      quizzesId: quizResponse.body[0].id,
      questionsId: questionResponse.body[0].id,
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /quizzes_collections - Only adms should be able to create a quiz collection", async () => {
    await request(app).post("/users").send(mockUser);
    const loginUser = await request(app).post("/login").send(mockUserLogin);

    const loginAdm = await request(app).post("/login").send(mockAdmLogin);

    const quizResponse = await request(app)
      .get("/quizzes")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    const questionResponse = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    const response = await request(app)
      .post("/quizzes_collections")
      .set("Authorization", `Bearer ${loginUser.body.token}`)
      .send({
        quizzesId: quizResponse.body[0].id,
        questionsId: questionResponse.body[0].id,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /quizzes_collections - Should not be able to create a quiz collection with invalid quiz", async () => {
    const loginAdm = await request(app).post("/login").send(mockAdmLogin);
    const questionResponse = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    const response = await request(app)
      .post("/quizzes_collections")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send({
        quizzesId: "b8681329-9097-4238-b8e6-a80fb1e87a80",
        questionsId: questionResponse.body[0].id,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /quizzes_collections - Should not be able to create a quiz collection with invalid questions", async () => {
    const loginAdm = await request(app).post("/login").send(mockAdmLogin);
    const quizResponse = await request(app)
      .get("/quizzes")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    const response = await request(app)
      .post("/quizzes_collections")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send({
        quizzesId: quizResponse.body[0].id,
        questionsId: "6620d602-dcdb-4f4a-9105-70e3cd7fe953",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /quizzes_collections -  should not be able to update a quiz collection with empty field(s)", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const response = await request(app)
      .post("/quizzes_collections")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send({ questionsId: "", quizzesId: "" });

    const mockError = { errors: response.body.error };
    expect(response.status).toBe(400);
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
  });

  test("GET /quizzes_collections - Must be able to list all quizzes collections", async () => {
    // await request(app).post("/users").send(mockAdm);
    const login = await request(app).post("/login").send(mockAdmLogin);
    const response = await request(app)
      .get("/quizzes_collections")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /quizzes_collections - Should not be able to list all quizzes collections without authentication", async () => {
    const response = await request(app).get("/quizzes_collections");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /quizzes_collections/quizzes/:id - Should be able to list a quiz from id", async () => {
    const loginAdm = await request(app).post("/login").send(mockAdmLogin);
    const quizCollection = await request(app)
      .get("/quizzes")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    const response = await request(app)
      .get(`/quizzes_collections/quizzes/${quizCollection.body[0].id}`)
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("GET /quizzes_collections/quizzes/:id - Should not be able to list a quiz collection from id without authentication", async () => {
    const loginAdm = await request(app).post("/login").send(mockAdmLogin);
    const quizCollection = await request(app)
      .get("/quizzes")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    const response = await request(app).get(
      `/quizzes_collections/quizzes/${quizCollection.body[0].id}`
    );
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /quizzes_collections/quizzes/:id - Should not be able to list a quiz collection from id without being admin", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const quizCollection = await request(app)
      .get("/quizzes")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const userLogin = await request(app).post("/login").send(mockUserLogin);
    const response = await request(app)
      .get(`/quizzes_collections/quizzes/${quizCollection.body[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /quizzes_collections/quizzes/:id - Shouldn't be able to list a quiz collection with invalid id ", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const response = await request(app)
      .get("/quizzes_collections/quizzes/4")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /quizzes_collections/:id - Must be able to update the quiz collection", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const quizCollectionUpdate = await request(app)
      .get("/quizzes_collections")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const newQuiz = await request(app)
      .post("/quizzes")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send({
        name: "Universo",
      });

    const response = await request(app)
      .patch(`/quizzes_collections/${quizCollectionUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send({
        quizzesId: newQuiz.body.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.quizzes.name).toEqual("Universo");
  });

  test("PATCH /quizzes_collections -  should not be able to update a quiz collection with empty field(s)", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const quizToUpdate = await request(app)
      .get("/quizzes_collections")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const response = await request(app)
      .patch(`/quizzes_collections/${quizToUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send({ questionsId: "", quizzesId: "" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /quizzes_collections/:id - Shouldn't be able to update Id of a quiz collection ", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const quizCollectionUpdate = await request(app)
      .get("/quizzes_collections")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const response = await request(app)
      .patch(`/quizzes_collections/${quizCollectionUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send({
        id: "6ee20de0-f24b-4938-8330-9bdef2ce79b3",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /quizzes_collections/:id - Should not be able to update quiz collection with an invalid id ", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);

    const response = await request(app)
      .patch("/quizzes_collections/6ee20de0-f24b-4938-8330-9bdef2ce79b3")
      .set("Authorization", `Bearer ${admLogin.body.token}`)
      .send({
        questionsId: "6ee20de0-f24b-4938-8330-9bdef2ce79b3",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /quizzes_collections/:id - Should not be able to delete a quiz collection without authentication", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);

    const quizCollectionDelete = await request(app)
      .get("/quizzes_collections")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const response = await request(app).delete(
      `/quizzes_collections/${quizCollectionDelete.body[0].id}`
    );
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /quizzes_collections/:id - Should not be able to delete a quiz collection without being admin", async () => {
    const userLogin = await request(app).post("/login").send(mockUserLogin);
    const quizCollectionDelete = await request(app)
      .get("/quizzes_collections")
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    const response = await request(app)
      .delete(`/quizzes_collections/${quizCollectionDelete.body[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /quizzes_collections/:id - Should not be able to delete a quiz collection with a invalid id", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const response = await request(app)
      .delete(`/quizzes_collections/6ee20de0-f24b-4938-8330-9bdef2ce79b3`)
      .set("Authorization", `Bearer: ${admLogin.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /quizzes_collections/:id - Must be able to delete a quiz collection", async () => {
    const admLogin = await request(app).post("/login").send(mockAdmLogin);
    const quizCollectionDelete = await request(app)
      .get("/quizzes_collections")
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const response = await request(app)
      .delete(`/quizzes_collections/${quizCollectionDelete.body[0].id}`)
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.status).toBe(204);
  });
});
