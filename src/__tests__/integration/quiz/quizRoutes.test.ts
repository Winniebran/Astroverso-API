import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import dataSourceConfig from "../../../data-source";
import { Quizzes } from "../../../entities/quizzes.entity";

describe("/quiz", () => {
  let connection: DataSource;
  const quizRepo = dataSourceConfig.getRepository(Quizzes);

  beforeAll(async () => {
    await dataSourceConfig
      .initialize()
      .then((res) => (connection = res))
      .catch((err) => console.error(err));
  });

  beforeEach(async () => {
    const quizzes = await quizRepo.find();
    await quizRepo.remove(quizzes);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should be able to list quizzes", async () => {
    await request(app).post("/quiz").send();
  });
});

//GET /quizzes
