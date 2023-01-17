import { IAstrosResponse } from "./../../../interfaces/astros/index";
import { mockAstro } from "./../../mocks/astros.mocks";
import { mockCategory } from "./../../mocks/categories.mock";
import { mockNewPost } from "./../../mocks/posts.mocks";
import request from "supertest";
import { app } from "../../../app";
import { DataSource } from "typeorm";
import dataSourceConfig from "../../../data-source";
import {
  mockAdm,
  mockAdmLogin,
  mockUser,
  mockUserLogin,
} from "../../mocks/users.mocks";
import { ValidationError } from "yup";

describe("/posts", () => {
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

  //POST

  test("POST /posts - Must be able to create a post", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const categoryId = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockCategory);

    const astroId = await request(app)
      .post("/astros")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockAstro);

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição",
        astrosId: `${astroId.body.id}`,
        categoriesId: `${categoryId.body.id}`,
      });

    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("categories");
    expect(response.body).toHaveProperty("astros");
    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });

  test("POST /posts - Should not be able to create a post that already exists", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const categoryId = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockCategory);

    const astroId = await request(app)
      .post("/astros")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockAstro);

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição",
        astrosId: `${astroId.body.id}`,
        categoriesId: `${categoryId.body.id}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /posts - Should not be able to create a post without description", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const categoryId = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockCategory);

    const astroId = await request(app)
      .post("/astros")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockAstro);

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "",
        astrosId: `${astroId.body.id}`,
        categoriesId: `${categoryId.body.id}`,
      });

    const mockError = { errors: response.body.error };
    expect(response.status).toBe(400);
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
  });

  test("POST /posts - Should not be able to create a post without category", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const astroId = await request(app)
      .post("/astros")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockAstro);

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste description",
        astrosId: `${astroId.body.id}`,
        categoriesId: "",
      });

    const mockError = { errors: response.body.error };
    expect(response.status).toBe(400);
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
  });

  test("POST /posts - Should not be able to create a post without description", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const categoryId = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockCategory);

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste description",
        astrosId: "",
        categoriesId: `${categoryId.body.id}`,
      });

    const mockError = { errors: response.body.error };
    expect(response.status).toBe(400);
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
  });

  test("POST /posts - Should not be able to create a post without authentication", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const categoryId = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockCategory);

    const astroId = await request(app)
      .post("/astros")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockAstro);

    const response = await request(app)
      .post("/posts")
      .send({
        description: "Teste de descrição",
        astrosId: `${astroId.body.id}`,
        categoriesId: `${categoryId.body.id}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /posts - Should not be able to create a post not being adm", async () => {
    await request(app).post("/users").send(mockUser);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockUserLogin);

    const categoryId = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockCategory);

    const astroId = await request(app)
      .post("/astros")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockAstro);

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição s/ adm",
        astrosId: `${astroId.body.id}`,
        categoriesId: `${categoryId.body.id}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /posts - Should not be able to create a post with invalid category", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const astroId = await request(app)
      .post("/astros")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockAstro);

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição",
        astrosId: `${astroId.body.id}`,
        categoriesId: "931a0eb6-bd87-4c24-a779-237db9c3e8",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /posts - Should not be able to create a post with invalid astro", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const categoryId = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockCategory);

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição",
        astrosId: "931a0eb6-bd87-4c24-a779-237db9c3e36",
        categoriesId: `${categoryId.body.id}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  //GET

  //   test("GET - Must be able to list all posts", async () => {
  //     const response = await request(app).get("/posts");

  //     expect(response.body).toHaveLength(1);
  //     expect(response.status).toBe(200);
  //   });

  //   test('GET - Must be able to list all posts from a category',async () => {

  //     const category = await request(app).get('/categories')
  //     const response = await request(app).get(`/posts/${category.body[0].id}`)

  //   })
});
