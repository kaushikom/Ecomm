import express from "express";
import { POST } from "../stripe/checkout.js";
import {
  addNewPayment,
  deletePayment,
  fetchAllPaymentsByUser,
  fetchByTaskId,
  updatePayment,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", POST);
paymentRouter.post("/addNew", addNewPayment);
paymentRouter.delete("/delete/:paymentId", deletePayment);
paymentRouter.get("/fetch/:userId", fetchAllPaymentsByUser);
paymentRouter.get("/fetchByTask/:taskId", fetchByTaskId);
paymentRouter.post("/update", updatePayment);

export { paymentRouter };
