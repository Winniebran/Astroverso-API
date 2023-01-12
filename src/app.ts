import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleError } from "./errors/handleError";
import optionsRouter from "./routes/options.routes";

export const app = express();
app.use(express.json());

// app.use("/users", );
// app.use("/login", );
// app.use("/favoritePosts", );
// app.use("/posts", );
// app.use("/astros", );
// app.use("/categories", );
// app.use("/quiz", );
// app.use("/questions", );
app.use("/options", optionsRouter);
// app.use("/extras", );
// app.use("/types", );

app.use(handleError);
