import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordUpdateEmail,
  sendResetSuccessEmail,
} from "../mailtrap/emails.js";
import { resolveSoa } from "dns";
import { userRouter } from "../routes/userRoutes.js";

const generateTokenAndSetCookie = async (res, id) => {
  try {
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return token;
  } catch (error) {
    throw new Error("Error generating tokens");
  }
};
// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error logging in: ", error);
    res.status(400).json({ error: error.message });
  }
};
// Verify User
const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.firstName);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {}
};
// Logout User
const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
// Forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 15 * 60 * 1000; //15 mins

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();
    // Send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    return res.status(200).json({ success: true, message: "Email link sent" });
  } catch (error) {
    console.log("Error sending reset password : ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
// Signup User
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.signup(firstName, lastName, email, password);
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, user.verificationToken);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Update user profile
const updateUserProfile = async (req, res) => {
  const { userId, lastName, company, location, phone } = req.body;
  console.log("Phone: ", phone);
  try {
    const updatedUser = await User.updateProfile(
      userId,
      lastName,
      company,
      location,
      phone
    );
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get user by id
const getUserById = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Update password
const updatePwd = async (req, res) => {
  const { userId, newPassword, oldPassword } = req.body;
  try {
    const updatedUser = await User.updatePwd(userId, oldPassword, newPassword);
    await sendPasswordUpdateEmail(updatedUser.email);
    res
      .status(200)
      .json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    // Find user using resetpasswordtoken
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }
    // update password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    user.resetPasswordExpiresAt = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    await sendResetSuccessEmail(user.email);
    return res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {}
};
// Refresh Access Token
const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken)
    res.status(401).json({ message: "Unauthroized request" });

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.SECRET);
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      res.status(401).json({ message: "Invalid Refresh token" });
    }

    if (incomingRefreshToken !== user.refreshToken) {
      res.status(401).json({ message: "Refresh token is expired or used" });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generateTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ accessToken, refreshToken, message: "Access Token Refreshed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// Check if user is authenticated
const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in checkAuth: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export {
  loginUser,
  signupUser,
  updateUserProfile,
  getUserById,
  updatePwd,
  logout,
  refreshAccessToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
};
