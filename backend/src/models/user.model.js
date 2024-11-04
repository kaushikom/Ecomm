import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    company: {
      type: String,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    type: {
      type: String,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);
// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
// static signup method
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password
) {
  // Validation
  if (!email || !password || !firstName) {
    throw Error("Please fill required fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email invalid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hrs
  });
  return user;
};
// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill required fields");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
};
// static method to update profile information
userSchema.statics.updateProfile = async function (
  userId,
  lastName,
  company,
  location,
  phone
) {
  const user = await this.findById(userId);
  if (!user) {
    throw Error("User not found");
  }

  // Update fields
  if (lastName) user.lastName = lastName;
  if (company) user.company = company;
  if (location) user.location = location;
  if (phone) user.phone = phone;

  // Save the updated user
  await user.save();

  return user;
};
// static method to update password information
userSchema.statics.updatePwd = async function (
  userId,
  oldPassword,
  newPassword
) {
  const user = await this.findById(userId);
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) {
    throw Error("Please enter correct old password");
  }
  if (user.password == newPassword || !newPassword) {
    throw Error("Please enter a new password");
  }
  // Update password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);
  user.password = hash;
  await user.save();
  return user;
};

export const User = mongoose.model("User", userSchema);
