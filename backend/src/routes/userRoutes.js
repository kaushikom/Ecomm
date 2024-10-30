import express from "express";
import {
  loginUser,
  signupUser,
  updateUserProfile,
  getUserById,
  updatePwd,
  logoutUser,
  refreshAccessToken,
} from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

// Secured Routes
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.post("/refreshToken", refreshAccessToken);

export { userRouter };
