import { postsRouter } from "./routes/posts.routes";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleError } from "./errors/handleError";
import { loginRouter } from "./routes/login.routes";
import { usersRouter } from "./routes/users.routes";
import { astrosRouter } from "./routes/astros.routes";
import { categoriesRouter } from "./routes/categories.routes";

export const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);
// app.use("/favoritePosts");
app.use("/posts", postsRouter);
app.use("/astros", astrosRouter);
app.use("/categories", categoriesRouter);
// app.use("/quiz");
// app.use("/questions");
// app.use("/options");
// app.use("/extras");
// app.use("/types");

app.use(handleError);
