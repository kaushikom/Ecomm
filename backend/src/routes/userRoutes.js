import express from "express";
import {
  loginUser,
  signupUser,
  updateUserProfile,
  getUserById,
  updatePwd,
} from "../controllers/userController.js";

const userRouter = express.Router();

// login route
userRouter.post("/login", loginUser);
// signup route
userRouter.post("/signup", signupUser);
// Update profile route
userRouter.post("/update", updateUserProfile);
// Get user by id
userRouter.post("/getUser", getUserById);
// Update userpassword
userRouter.post("/updatePwd", updatePwd);

export { userRouter };
