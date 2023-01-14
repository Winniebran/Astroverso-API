import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleError } from "./errors/handleError";
<<<<<<< HEAD
import optionsRouter from "./routes/options.routes";
=======
import { loginRouter } from "./routes/login.routes";
import { usersRouter } from "./routes/users.routes";
import { astrosRouter } from "./routes/astros.routes";
import { categoriesRouter } from "./routes/categories.routes";
>>>>>>> 5d564ac1504b9237ee373dd01a428b98193e0702

export const app = express();
app.use(express.json());

<<<<<<< HEAD
app.use("/users", );
app.use("/login", );
app.use("/favoritePosts", );
app.use("/posts", );
app.use("/astros", );
app.use("/categories", );
app.use("/quiz", );
app.use("/questions", );
app.use("/options", optionsRouter);
app.use("/extras", );
app.use("/types", );
=======
app.use("/users", usersRouter);
app.use("/login", loginRouter);
// app.use("/favoritePosts");
// app.use("/posts");
app.use("/astros", astrosRouter);
app.use("/categories", categoriesRouter);
// app.use("/quiz");
// app.use("/questions");
// app.use("/options");
// app.use("/extras");
// app.use("/types");
>>>>>>> 5d564ac1504b9237ee373dd01a428b98193e0702

app.use(handleError);
