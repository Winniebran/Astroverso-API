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
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const categoryResponse = await request(app).get("/categories");
    const astroResponse = await request(app).get("/astros");
    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição",
        astrosId: `${astroResponse.body[0].id}`,
        categoriesId: `${categoryResponse.body[0].id}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /posts - Should not be able to create a post without description", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const categoryResponse = await request(app).get("/categories");
    const astroResponse = await request(app).get("/astros");

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "",
        astrosId: `${categoryResponse.body[0].id}`,
        categoriesId: `${astroResponse.body[0].id}`,
      });

    const mockError = { errors: response.body.error };
    expect(response.status).toBe(400);
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
  });

  test("POST /posts - Should not be able to create a post without category", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const astroResponse = await request(app).get("/astros");

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste description",
        astrosId: `${astroResponse.body[0].id}`,
        categoriesId: "",
      });

    const mockError = { errors: response.body.error };
    expect(response.status).toBe(400);
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
  });

  test("POST /posts - Should not be able to create a post without astro", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const categoryResponse = await request(app).get("/categories");

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste description",
        astrosId: "",
        categoriesId: `${categoryResponse.body[0].id}`,
      });

    const mockError = { errors: response.body.error };
    expect(response.status).toBe(400);
    expect(mockError).toMatchObject<Partial<ValidationError>>(mockError);
  });

  test("POST /posts - Should not be able to create a post without authentication", async () => {
    const categoryResponse = await request(app).get("/categories");
    const astroResponse = await request(app).get("/astros");

    const response = await request(app)
      .post("/posts")
      .send({
        description: "Teste de descrição",
        astrosId: `${astroResponse.body[0].id}`,
        categoriesId: `${categoryResponse.body[0].id}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /posts - Should not be able to create a post without adm permission", async () => {
    await request(app).post("/users").send(mockUser);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockUserLogin);

    const categoryResponse = await request(app).get("/categories");
    const astroResponse = await request(app).get("/astros");

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição s/ adm",
        astrosId: `${astroResponse.body[0].id}`,
        categoriesId: `${categoryResponse.body[0].id}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /posts - Should not be able to create a post with invalid category", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const astroResponse = await request(app).get("/astros");

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição",
        astrosId: `${astroResponse.body[0].id}`,
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

    const astroResponse = await request(app).get("/astros");

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Teste de descrição",
        astrosId: "931a0eb6-bd87-4c24-a779-237db9c3e36",
        categoriesId: `${astroResponse.body[0].id}`,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  //GET;

  test("GET - Must be able to list all posts", async () => {
    const response = await request(app).get("/posts");

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET - Must be able to list all posts from a category", async () => {
    const category = await request(app).get("/categories");
    const response = await request(app).get(
      `/posts/category/${category.body[0].id}`
    );

    expect(response.body[0]).toHaveProperty("categories");
    expect(response.body[0]).toHaveProperty("astros");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body[0]).toHaveProperty("id");
    expect(response.status).toBe(200);
  });

  test("GET - Should not be able to list posts from an invalid category", async () => {
    const response = await request(app).get(
      "/posts/category/bedce604-4580-4f93-8b5f-c00f"
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("GET - Must be able to list all posts from an astro", async () => {
    const astro = await request(app).get("/astros");
    const response = await request(app).get(`/posts/astro/${astro.body[0].id}`);

    expect(response.body[0]).toHaveProperty("categories");
    expect(response.body[0]).toHaveProperty("astros");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body[0]).toHaveProperty("id");
    expect(response.status).toBe(200);
  });

  test("GET - Should not be able to list posts from an invalid astro", async () => {
    const response = await request(app).get(
      "/posts/astro/bedce604-4580-4f93-8b5f-c00f"
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  //PATCH

  test("PATCH - Must be able to update the description of a post", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const postToUpdate = await request(app).get("/posts");

    const response = await request(app)
      .patch(`/posts/${postToUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Descrição atualizada",
      });

    expect(response.status).toBe(200);
    expect(response.body.description).toEqual("Descrição atualizada");
  });

  test("PATCH - Must be able to update the category of a post", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const postToUpdate = await request(app).get("/posts");

    const newCategory = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({ name: "estrelas" });

    const response = await request(app)
      .patch(`/posts/${postToUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        categoriesId: newCategory.body.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.categories.name).toEqual("estrelas");
  });

  test("PATCH - Must be able to update the astro of a post", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const postToUpdate = await request(app).get("/posts");

    const newAstro = await request(app)
      .post("/astros")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        name: "Sol",
        image: "https://www.infoescola.com/wp-content/uploads/2013/08/sol.jpg",
      });

    const response = await request(app)
      .patch(`/posts/${postToUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        astrosId: newAstro.body.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.astros.name).toEqual("Sol");
  });

  test("PATCH - Should not be able to update id", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const postToUpdate = await request(app).get("/posts");

    const response = await request(app)
      .patch(`/posts/${postToUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        id: "6ee20de0-f24b-4938-8330-9bdef2ce79b3",
        description: "Descrição atualizada",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH - Should not be able to update post without authorization", async () => {
    const postToUpdate = await request(app).get("/posts");

    const response = await request(app)
      .patch(`/posts/${postToUpdate.body[0].id}`)
      .send({
        description: "Descrição atualizada",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH - Should not be able to update post without adm permission", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockUserLogin);

    const postToUpdate = await request(app).get("/posts");

    const response = await request(app)
      .patch(`/posts/${postToUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        description: "Descrição atualizada",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("PATCH - Should not be able to update post with an invalid id", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const response = await request(app)
      .patch("/posts/bedce604-4580-4f93-8b5f-c00f")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        description: "Descrição atualizada",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  //DELETE

  test("DELETE - Should not be able to delete without authorization", async () => {
    const postToDelete = await request(app).get("/posts");

    const response = await request(app).delete(
      `/posts/${postToDelete.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE - Should not be able to delete without adm permission", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockUserLogin);

    const postToDelete = await request(app).get("/posts");

    const response = await request(app)
      .delete(`/posts/${postToDelete.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE - Should not be able to delete with an invalid id", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const response = await request(app)
      .delete("/posts/bedce604-4580-4f93-8b5f-c00f")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE - Should be able to delete a post", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockAdmLogin);

    const postToDelete = await request(app).get("/posts");

    const response = await request(app)
      .delete(`/posts/${postToDelete.body[0].id}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
});
