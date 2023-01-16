import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleError } from "./errors/handleError";
import { loginRouter } from "./routes/login.routes";
import { usersRouter } from "./routes/users.routes";
import { astrosRouter } from "./routes/astros.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { typesRouter } from "./routes/types.routes";
import { extrasRouter } from "./routes/extras.routes";

export const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);
// app.use("/favoritePosts");
// app.use("/posts");
app.use("/astros", astrosRouter);
app.use("/categories", categoriesRouter);
app.use("/quizzes");
// app.use("/questions");
// app.use("/options");
app.use("/extras", extrasRouter);
app.use("/types", typesRouter);

app.use(handleError);
