import { mockAstro } from "./../../mocks/astros.mocks";
import { mockCategory } from "./../../mocks/categories.mock";
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

describe("/favoritePosts", () => {
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

  test("POST /favoritePosts - Must be able to create a favorite post", async () => {
    await request(app).post("/users").send(mockAdm);
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const userResponse = await request(app).post("/users").send(mockUser);

    const categoryResponse = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockCategory);

    const astroResponse = await request(app)
      .post("/astros")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockAstro);

    const postResponse = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição",
        astrosId: `${astroResponse.body.id}`,
        categoriesId: `${categoryResponse.body.id}`,
      });

    const response = await request(app)
      .post("/favoritePosts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        usersId: userResponse.body.id,
        postsId: postResponse.body.id,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("score");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.body).toHaveProperty("favorite_posts");
    expect(response.status).toBe(201);
  });

  test("POST /favoritePosts - Should not be able to create a favorite post without authorization", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const userResponse = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);
    const categoryResponse = await request(app).get("/categories");
    const astroResponse = await request(app).get("/astros");

    const postResponse = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição",
        astrosId: `${astroResponse.body.id}`,
        categoriesId: `${categoryResponse.body.id}`,
      });

    const response = await request(app).post("/favoritePosts").send({
      usersId: userResponse.body[0].id,
      postsId: postResponse.body.id,
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /favoritePosts - Should not able to create a favorite post without postId", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const userResponse = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    const response = await request(app)
      .post("/favoritePosts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        usersId: userResponse.body[0].id,
      });

    const mockError = { errors: response.body.error };
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
    expect(response.status).toBe(400);
  });

  test("POST /favoritePosts - Should not be able to create a favorite post without userId", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const categoryResponse = await request(app).get("/categories");
    const astroResponse = await request(app).get("/astros");

    const postResponse = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição",
        astrosId: `${astroResponse.body.id}`,
        categoriesId: `${categoryResponse.body.id}`,
      });

    const response = await request(app)
      .post("/favoritePosts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        postsId: postResponse.body.id,
      });

    const mockError = { errors: response.body.error };
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
    expect(response.status).toBe(400);
  });

  //GET

  test("GET /favoritePosts - Must be able to list all favorite posts", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const response = await request(app)
      .get("/favoritePosts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("email");
    expect(response.body[0]).toHaveProperty("isAdm");
    expect(response.body[0]).toHaveProperty("isActive");
    expect(response.body[0]).toHaveProperty("score");
    expect(response.body[0]).toHaveProperty("createdAt");
    expect(response.body[0]).toHaveProperty("updatedAt");
    expect(response.body[0]).toHaveProperty("deletedAt");
    expect(response.body[0]).toHaveProperty("favorite_posts");
    expect(response.status).toBe(200);
  });

  test("GET /favoritePosts - Should not be able to list all favorite posts without authorization", async () => {
    const response = await request(app).get("/favoritePosts");

    const mockError = { errors: response.body.error };
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
    expect(response.status).toBe(401);
  });

  //GET /:id

  test("GET /favoritePosts - Must be able to list favorite posts from user", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const userResponse = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    const response = await request(app)
      .get(`/favoritePosts/${userResponse.body[1].id}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("favorite_posts");
    expect(response.body.favorite_posts).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /favoritePosts - Should not be able to list favorite posts from user without authorization", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const userResponse = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    const response = await request(app).get(
      `/favoritePosts/${userResponse.body[1].id}`
    );

    const mockError = { errors: response.body.error };
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
    expect(response.status).toBe(401);
  });

  test("GET /favoritePosts - Should not be able to list favorite posts from user with and invalid id", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const response = await request(app)
      .get("/favoritePosts/3ecd40e7-9588-444e-bc16-7b9257b05eb")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    const mockError = { errors: response.body.error };
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
    expect(response.status).toBe(404);
  });

  //DELETE /:id
});
