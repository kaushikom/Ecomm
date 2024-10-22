import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // Creating token
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

export { loginUser, signupUser, updateUserProfile, getUserById, updatePwd };
