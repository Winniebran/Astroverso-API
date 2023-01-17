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
import { quizzesRouter } from "./routes/quiz.routes";
import { optionsRouter } from "./routes/options.routes";
import { postsRouter } from "./routes/posts.routes";
import { questionsRouter } from "./routes/questions.routes";
import { favoritePostsRouter } from "./routes/favoritePosts.routes";
import { quizzes_questionsRouter } from "./routes/quizzes_questions.routes";

export const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/favoritePosts", favoritePostsRouter);
app.use("/posts", postsRouter);
app.use("/astros", astrosRouter);
app.use("/categories", categoriesRouter);
app.use("/quizzes", quizzesRouter);
app.use("/questions", questionsRouter);
app.use("/options", optionsRouter);
app.use("/extras", extrasRouter);
app.use("/types", typesRouter);
app.use("/quizzes_collections", quizzes_questionsRouter);

app.use(handleError);
