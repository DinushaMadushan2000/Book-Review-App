import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReviewForm({ bookId }) {
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);  // Initialize reviews with an empty array
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch reviews for the current book
    axios
      .get(`http://localhost:5001/api/v1/books/${bookId}/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.bookReview)) {
          setReviews(response.data.bookReview);
        } else {
          setReviews([]);  // Set reviews to empty if no reviews are found
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        alert("Failed to fetch reviews.");
        setReviews([]);  // Set reviews to empty if there is an error
      });
  }, [bookId, navigate]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    const token = localStorage.getItem("token");
    if (!token) return alert("You need to be logged in!");

    try {
      await axios.put(
        `http://localhost:5001/api/v1/books/${bookId}/reviews`,  // PUT request to add/update review
        { review_text: reviewText },  // Send the review text in the body
        {
          headers: { Authorization: `Bearer ${token}` },  // Attach the JWT token for authentication
        }
      );
      alert("Review added/updated successfully!");

      // Refresh reviews after adding/updating a review
      axios
        .get(`http://localhost:5001/api/v1/books/${bookId}/reviews`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data && Array.isArray(response.data.bookReview)) {
            setReviews(response.data.bookReview);  // Update reviews state
          }
        });
    } catch (error) {
      console.error("Error adding/updating review", error);
      alert("Error adding/updating review");
    }
  };

  // Handle deleting a review
  const handleReviewDelete = async (reviewId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You need to be logged in!");

    try {
      await axios.delete(
        `http://localhost:5001/api/v1/books/${bookId}/reviews/${reviewId}`,  // DELETE request to remove review
        {
          headers: { Authorization: `Bearer ${token}` },  // Attach the JWT token for authentication
        }
      );

      // Remove the deleted review from the state
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review", error);
      alert("Error deleting review");
    }
  };
  
  return (
    <div>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
        />
        <button type="submit">Submit Review</button>
      </form>

      <h3>Existing Reviews</h3>
      {reviews && reviews.length > 0 ? (
        <ul>
          {/* Safely map over reviews */}
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                {review.review_text} - <b>{review.User?.username}</b>
              </p>
              <button onClick={() => handleReviewDelete(review.id)}>
                Delete Review
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet for this book.</p>
      )}
    </div>
  );
}

export default ReviewForm;