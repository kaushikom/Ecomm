import express from "express";

import {
  addNewTask,
  deleteTask,
  fetchTask,
  fetchAllTasks,
  fetchTasksByStatus,
  fetchAllTasksByUser,
  updateTaskStatus,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/add", addNewTask);
taskRouter.delete("/delete/:id", deleteTask);
taskRouter.get("/get", fetchAllTasks);
taskRouter.get("/get/:id", fetchTask);
taskRouter.get("/getByStatus/:status", fetchTasksByStatus);
taskRouter.get("/getByUser/:id", fetchAllTasksByUser);
taskRouter.put("/update", updateTaskStatus);

export { taskRouter };
