import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleError } from "./errors/handleError";
import { loginRouter } from "./routes/login.routes";
import { usersRouter } from "./routes/users.routes";
import { questionsRouter } from "./routes/questions.routes";


export const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);
// app.use("/favoritePosts");
// app.use("/posts");
// app.use("/astros");
// app.use("/categories");
// app.use("/quiz");
app.use("/questions", questionsRouter);
// app.use("/options");
// app.use("/extras");
// app.use("/types");

app.use(handleError);