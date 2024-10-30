import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { handleStripeWebhook } from "./stripe/webhook.js";
import { userRouter } from "./routes/userRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { serviceRouter } from "./routes/serviceRoutes.js";
import { taskRouter } from "./routes/taskRoutes.js";
import { paymentRouter } from "./routes/paymentRoute.js";
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routers
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/service", serviceRouter);
app.use("/api/task", taskRouter);
app.use("/api/payment", paymentRouter);

export { app };
