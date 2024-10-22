import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";

const app = express();
// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routers
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);

export { app };
