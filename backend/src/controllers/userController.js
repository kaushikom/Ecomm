import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateTokens = async (id) => {
  try {
    const user = await User.findById(id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error generating tokens");
  }
};
// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // Creating token
    const { accessToken, refreshToken } = await generateTokens(user._id);
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // Cookie options
    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ user, accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Logout User
const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ success: true, message: "User logged out successfully" });
};
// Signup User
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.signup(firstName, lastName, email, password);
    // Creating token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Update user profile
const updateUserProfile = async (req, res) => {
  const { userId, lastName, company, location } = req.body;

  try {
    const updatedUser = await User.updateProfile(
      userId,
      lastName,
      company,
      location
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
    res
      .status(200)
      .json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

export {
  loginUser,
  signupUser,
  updateUserProfile,
  getUserById,
  updatePwd,
  logoutUser,
  refreshAccessToken,
};
