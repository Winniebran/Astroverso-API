import { DataSource } from "typeorm";
import dataSource from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";

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

  test("POST /optons Shold be able to create a new option", async () => {});
});
