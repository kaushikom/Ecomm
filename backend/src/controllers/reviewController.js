import { Service } from "../models/service.model.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";
import { Review } from "../models/review.model.js";

export const addReview = async (req, res) => {
  const { taskId } = req.params;
  const { rating, description } = req.body;
  try {
    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "This task doesn't exists" });
    }
    // Create review
    const review = await Review.create({
      service: task.serviceType,
      task: task._id,
      user: task.owner,
      rating: Number(rating),
      description,
    });
    return res
      .status(200)
      .json({ success: true, message: "Review Added", review });
  } catch (error) {
    console.log("Error adding review: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, description } = req.body;
  try {
    // Check if the id is valid
    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid reviewId" });
    }
    // Update the review
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, description },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Review Updated", updatedReview });
  } catch (error) {
    console.log("Error updating review: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    // Check if the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(400)
        .json({ success: false, message: "Review doesn't exists" });
    }
    // Delete review
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    return res
      .status(200)
      .json({ success: true, message: "Review deleted", deletedReview });
  } catch (error) {
    console.log("Error deleting review: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getReviews = async (req, res) => {
  const { searchParam, searchId } = req.params;
  const validSearchParams = ["service", "user", "task"];

  // Check if searchParam is valid
  if (!validSearchParams.includes(searchParam)) {
    return res.status(400).json({
      success: false,
      message: `Invalid search parameter: ${searchParam}. Valid options are ${validSearchParams.join(
        ", "
      )}.`,
    });
  }

  try {
    const reviews = await Review.find({ [searchParam]: searchId }).populate([
      { path: "user", select: "firstName lastName email" },
    ]);
    return res.status(200).json({
      success: true,
      message: `Fetched reviews by ${searchParam}`,
      reviews,
    });
  } catch (error) {
    console.log(`Error fetching reviews by ${searchParam}: `, error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAverageRatingByService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    //    Check if the service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res
        .status(400)
        .json({ success: false, message: "Service not found" });
    }
    const result = await Review.aggregate([
      {
        $match: { service: service._id }, // Match reviews for the specific service
      },
      {
        $group: {
          _id: "$service", // Group by service
          averageRating: { $avg: "$rating" }, // Calculate average rating
          numberOfReviews: { $sum: 1 }, // Count the number of reviews
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for this service.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Fetched average rating and review count for service ${serviceId}`,
      averageRating: result[0].averageRating,
      numberOfReviews: result[0].numberOfReviews,
    });
  } catch (error) {
    console.error(
      `Error fetching average rating and review count for service ${serviceId}: `,
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const reviews = await Review.find();
    return res
      .status(200)
      .json({ success: true, message: "Fetched all reviews", reviews });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
