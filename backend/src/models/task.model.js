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
      enum: [
        "Query Raised",
        "Meeting Booked",
        "Agreed to T&C",
        "Task In Progress",
        "Completed",
      ],
      default: "Query Raised",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
