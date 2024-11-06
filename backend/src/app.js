import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { handleStripeWebhook } from "./stripe/webhook.js";
import { userRouter } from "./routes/userRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { serviceRouter } from "./routes/serviceRoutes.js";
import { taskRouter } from "./routes/taskRoutes.js";
import { paymentRouter } from "./routes/paymentRoute.js";
import { reviewRouter } from "./routes/reviewRoute.js";
import { Service } from "./models/service.model.js";
import { Category } from "./models/category.model.js";
const app = express();

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);
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
app.use("/api/service", serviceRouter);
app.use("/api/task", taskRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/review", reviewRouter);

// Search
app.get("/api/search", async (req, res) => {
  const searchTerm = req.query.q;
  try {
    const services = await Service.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    const categories = await Category.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    res.json({ services, categories });
  } catch (error) {
    res.status(500).json({ error: "Failed to search" });
  }
});

export { app };
