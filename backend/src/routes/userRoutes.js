import express from "express";
import {
  loginUser,
  signupUser,
  updateUserProfile,
  getUserById,
  updatePwd,
  logout,
  refreshAccessToken,
  verifyEmail,
  forgotPassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

// login route
userRouter.post("/login", loginUser);
// signup route
userRouter.post("/signup", signupUser);
// verify email
userRouter.post("/verify", verifyEmail);
// forgot pass
userRouter.post("/forgot-password", forgotPassword);

// Update profile route
userRouter.post("/update", updateUserProfile);
// Get user by id
userRouter.post("/getUser", getUserById);
// Update userpassword
userRouter.post("/updatePwd", updatePwd);

// test
userRouter.post("/test", (req, res) =>
  res.status(200).json({ success: true, message: "working" })
);

// Secured Routes
userRouter.post("/logout", logout);
userRouter.post("/refreshToken", refreshAccessToken);

export { userRouter };
