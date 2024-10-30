import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    milestone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["paid", "upcoming", "failed"],
      default: "upcoming",
    },
    stripe: {
      sessionId: {
        type: String,
      },
      paymentIntentId: {
        type: String,
      },
      paymentMethod: {
        type: String,
      },
      paymentStatus: {
        type: String,
      },
      receiptUrl: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
