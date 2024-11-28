import { Router } from "express";
import authenticate from "../middleware/authenticate.js";  // Ensure this middleware checks for valid token
import * as reviewControllers from "../controllers/review.js";

const router = Router();

// Add or Update Review
router.put("/books/:bookId/reviews", authenticate, reviewControllers.addReview);

// Get Reviews for a Book
router.get("/books/:bookId/reviews", reviewControllers.getReview);

// Delete a Review
router.delete("/books/:bookId/reviews/:reviewId", authenticate, reviewControllers.deleteReview);

export default router;