import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleError } from "./errors/handleError";
import {optionsRouter} from "./routes/options.routes";
import { loginRouter } from "./routes/login.routes";
import { usersRouter } from "./routes/users.routes";
import { astrosRouter } from "./routes/astros.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { questionsRouter } from "./routes/questions.routes";

export const app = express();
app.use(express.json());


app.use("/users", usersRouter);
app.use("/login", loginRouter);
// app.use("/favoritePosts");
// app.use("/posts");
app.use("/astros", astrosRouter);
app.use("/categories", categoriesRouter);
// app.use("/quiz");
app.use("/questions", questionsRouter);
app.use("/options", optionsRouter);
// app.use("/extras");
// app.use("/types");


app.use(handleError);
