import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
reviewSchema.index({ task: 1 });
reviewSchema.statics.calculateAverageRating = async function (serviceId) {
  const result = await this.aggregate([
    {
      $match: { service: serviceId },
    },
    {
      $group: {
        _id: "$service",
        averageRating: { $avg: "$rating" },
        numberOfReviews: { $sum: 1 },
      },
    },
  ]);
  return result[0] || { averageRating: 0, numberOfReviews: 0 };
};

export const Review = mongoose.model("Review", reviewSchema);
