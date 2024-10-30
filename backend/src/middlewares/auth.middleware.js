import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized Request" });
      next();
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) res.status(401).json({ message: "Invalid access token" });
    req.user = user;
    next();
  } catch (error) {
    throw new Error("Invalid access token");
  }
};
