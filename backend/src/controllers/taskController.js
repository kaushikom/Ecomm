import { Service } from "../models/service.model.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";
import {
  sendStatusUpdateEmail,
  sendQueryReceivedEmail,
} from "../mailtrap/emails.js";

const addNewTask = async (req, res) => {
  const { serviceId, userId, message } = req.body;
  if (!serviceId || !userId) {
    res.status(400).json({
      success: false,
      message: "ServiceId or UserId not present in input",
    });
  }
  try {
    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      res.status(400).json({ success: false, message: "User doesn't exists" });
    }
    // Check if the service exists
    const serviceExists = await Service.findById(serviceId);
    if (!serviceExists) {
      res
        .status(400)
        .json({ success: false, message: "Service doesn't exists" });
    }
    // Create new task
    const newTask = await Task.create({
      serviceType: serviceId,
      message,
      owner: userId,
    });
    const populatedTask = await Task.findById(newTask._id).populate([
      { path: "serviceType", select: "name" },
      { path: "owner", select: "firstName email" },
    ]);
    await sendQueryReceivedEmail(
      populatedTask.owner.email,
      populatedTask.serviceType.name,
      populatedTask.message
    );
    res.status(200).json({
      success: true,
      message: "Task created successfully",
      populatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.messagae,
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ success: false, message: "Id not present" });
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Task deleted", deletedTask });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const fetchTask = async (req, res) => {
  const { id } = req.params;
  if (!id)
    res.status(400).json({ success: false, message: "Task id not present" });
  try {
    const task = await Task.findById(id).populate([
      { path: "serviceType", select: "name" },
      { path: "owner", select: "firstName email" },
    ]);
    res.status(200).json({ success: true, message: "Fetched task", task });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const fetchAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({}).populate([
      { path: "serviceType", select: "name imageUrl" },
      { path: "owner", select: "firstName email" },
    ]);
    res
      .status(200)
      .json({ success: true, message: "Fetched all tasks", tasks: allTasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const fetchAllTasksByUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if user exists
    const userExists = await User.findById(id);
    if (!userExists) {
      res.status(400).json({ success: false, message: "User doesn't exists" });
    }
    const tasks = await Task.find({ owner: id }).populate([
      { path: "serviceType", select: "name imageUrl" },
    ]);
    res.status(200).json({ success: true, message: "Fetched tasks", tasks });
  } catch (error) {
    res.status(500).json({ success: false, messagae: "Internal Server Error" });
  }
};

const fetchTasksByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const tasks = await Task.find({ status }).populate([
      { path: "serviceType", select: "name imageUrl" },
      { path: "owner", select: "firstName email" },
    ]);
    res.status(200).json({ success: true, messagae: "Fetched", tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id, newStatus } = req.body;

    // Validate required fields
    if (!id || !newStatus) {
      return res.status(400).json({
        success: false,
        message: "Please provide both task id and new status",
      });
    }

    // Validate status enum values
    const validStatuses = [
      "Query Raised",
      "Meeting Booked",
      "Agreed to T&C",
      "Task In Progress",
      "Completed",
    ];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Status must be one of: ${validStatuses.join(
          ", "
        )}`,
      });
    }

    // Check if the task exists
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Update task with new status and return updated document
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true } // Return the updated document
    ).populate([
      { path: "owner", select: "email" },
      { path: "serviceType", select: "name" },
    ]);
    // console.log(updatedTask);
    await sendStatusUpdateEmail(
      updatedTask.owner.email,
      updatedTask.status,
      updatedTask.serviceType.name
    );
    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export {
  addNewTask,
  deleteTask,
  fetchTask,
  fetchAllTasks,
  fetchTasksByStatus,
  fetchAllTasksByUser,
  updateTaskStatus,
};
