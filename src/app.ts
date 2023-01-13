import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleError } from "./errors/handleError";
import { astrosRoutes } from "./routes/astros.routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { loginRouter } from "./routes/login.routes";
import { usersRouter } from "./routes/users.routes";

export const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);
// app.use("/favoritePosts");
// app.use("/posts");
app.use("/astros", astrosRoutes);
app.use("/categories", categoriesRoutes);
// app.use("/quiz");
// app.use("/questions");
// app.use("/options");
// app.use("/extras");
// app.use("/types");

app.use(handleError);
