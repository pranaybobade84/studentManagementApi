import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

import authRouter from "./routes/auth.js";
import courseRouter from "./routes/course.js";
import studentRouter from "./routes/student.js";

app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/students", studentRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});
app.use(errorHandler);
export default app;
