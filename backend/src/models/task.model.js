import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    serviceType: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    message: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["query", "meeting", "agreed", "process", "completed"],
      default: "query",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
