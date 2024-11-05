import express from "express";
import {
  addReview,
  updateReview,
  deleteReview,
  getReviews,
  getAverageRatingByService,
  getAll,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

// Get reviews by param
reviewRouter.get("/getBy/:searchParam/:searchId", getReviews);

// Get all reviews
reviewRouter.get("/getAll", getAll);

// Add reviews
reviewRouter.post("/add/:taskId", addReview);

// Update reviews
reviewRouter.put("/update/:reviewId", updateReview);

// Delete reviews
reviewRouter.delete("/delete/:reviewId", deleteReview);

// Get Average rating
reviewRouter.get("/averageRating/:serviceId", getAverageRatingByService);

export { reviewRouter };
