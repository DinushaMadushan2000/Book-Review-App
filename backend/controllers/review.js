import review from "../models/review.js";
import user from "../models/user.js";
import book from "../models/book.js";

// Add or Update Review for a Book
export async function addReview(req, res) {
    try {
        const { user_id } = req.user; // Get the user ID from the authenticated user
        const { bookId } = req.params; // Get the book ID from the request params
        const { review_text } = req.body; // Get the review text from the body

        // Check if the review already exists for this user and book
        const foundReview = await review.findOne({
            where: { UserId: user_id, BookId: bookId },
        });

        if (foundReview) {
            // If the review exists, update the existing review
            await review.update(
                { review_text },
                { where: { UserId: user_id, BookId: bookId } }
            );
            return res.json({ message: "Review updated successfully!" });
        }

        // If no review exists, create a new review
        await review.create({
            UserId: user_id,
            BookId: bookId,
            review_text,
        });

        res.json({ message: "Review added successfully!" });
    } catch (error) {
        console.error("Error adding/updating review:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

// Get All Reviews for a Book
export async function getReview(req, res) {
    try {
        const { bookId } = req.params; // Get the book ID from the request params

        console.log("Fetching reviews for Book ID:", bookId);

        // Fetch all reviews for the book, including associated user details
        const bookReviews = await review.findAll({
            attributes: ["id", "review_text", "UserId"], // Fetch review ID, text, and user ID
            where: { BookId: bookId }, // Filter by book ID
            include: [
                {
                    model: user,
                    attributes: ["username"], // Include the username of the reviewer
                },
            ],
        });

        console.log("Fetched reviews:", bookReviews);

        if (bookReviews.length === 0) {
            return res.json({ message: "No reviews found for this book." });
        }

        res.json({ message: "Reviews found for this book.", bookReview: bookReviews });
    } catch (error) {
        console.error("Error fetching reviews:", error); // Log the full error
        res.status(500).json({ message: "Internal Server Error!", error: error.message });
    }
}

// Delete a Review for a Book by the Logged-in User
export async function deleteReview(req, res) {
    try {
        const { user_id } = req.user; // Get the user ID from the authenticated user
        const { bookId, reviewId } = req.params; // Get the book ID and review ID from the request params

        // Find the review that matches the user and book
        const deletedReview = await review.destroy({
            where: { UserId: user_id, BookId: bookId, id: reviewId },
        });

        if (!deletedReview) {
            return res.json({ message: "No review found for that user to delete!" });
        }

        res.json({ message: "Review deleted successfully!" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}