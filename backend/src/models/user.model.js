import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

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
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
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

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
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

export const User = mongoose.model("User", userSchema);
