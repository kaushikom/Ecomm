import { Payment } from "../models/payment.model.js";
import { Task } from "../models/task.model.js";
import mongoose from "mongoose";

const addNewPayment = async (req, res) => {
  const { task, amount, milestone, description, dueDate } = req.body;

  // Validate required fields
  if (!task || !amount) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill mandatory fields" });
  }

  try {
    // Check if the task exists
    const taskExists = await Task.findById(task);
    if (!taskExists) {
      return res
        .status(400)
        .json({ success: false, message: "This task doesn't exists" });
    }

    // Create new payment
    const newPayment = await Payment.create({
      task,
      amount,
      milestone,
      description,
      dueDate,
    });

    return res.status(200).json({
      success: true,
      message: "Payment Created Successfully",
      payment: newPayment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deletePayment = async (req, res) => {
  const { paymentId } = req.params;
  if (!paymentId)
    res
      .status(400)
      .json({ success: false, message: "Payment Id not present in request" });
  try {
    // Check if the payment exists
    const payment = await Payment.findById(paymentId);
    if (!payment)
      res
        .status(400)
        .json({ success: false, message: "This payment doesn't exists" });
    // Check if the payment status is paid
    if (payment.status == "paid")
      res.status(400).json({
        success: false,
        message: "Cannot delete a completed payment record",
      });

    // Finally delete the payment
    const deletedPayment = await Payment.findByIdAndDelete(paymentId);
    res
      .status(200)
      .json({ success: true, message: "Payment deleted", deletedPayment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const fetchAllPaymentsByUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User Id not present" });
  }

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // First find all tasks owned by this user
    const userTasks = await Task.find({ owner: userObjectId }).select("_id");
    const taskIds = userTasks.map((task) => task._id);

    // Then find all payments for these tasks
    const payments = await Payment.find({
      task: { $in: taskIds },
    }).populate({
      path: "task",
      populate: [
        {
          path: "owner",
          select: "email name",
        },
        {
          path: "serviceType",
          select: "name",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: payments,
      message: "Payments fetched successfully",
    });
  } catch (error) {
    console.error("Error details:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching payments",
      error: error.message,
    });
  }
};

const fetchByTaskId = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId).populate([
      { path: "owner", select: "email" },
      { path: "serviceType", select: "name" },
    ]);
    const payments = await Payment.find({ task: taskId });
    res
      .status(200)
      .json({ success: true, message: "Fetched!", payments, task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updatePayment = async (req, res) => {
  const { paymentId, amount, milestone, description } = req.body;
  if (!paymentId || !amount || !milestone) {
    return res
      .status(400)
      .json({ success: false, message: "Icomplete data submitted" });
  }
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        amount,
        milestone,
        description,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      updatedPayment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export {
  addNewPayment,
  deletePayment,
  fetchAllPaymentsByUser,
  fetchByTaskId,
  updatePayment,
};
