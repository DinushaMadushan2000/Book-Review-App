import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function ReviewForm({ bookId }) {
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    
    axios
      .get(`http://localhost:5001/api/v1/books/${bookId}/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.bookReview)) {
          setReviews(response.data.bookReview);
        } else {
          setReviews([]);  
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        alert("Failed to fetch reviews.");
        setReviews([]); 
      });
  }, [bookId, navigate]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();  
    const token = localStorage.getItem("token");
    if (!token) return alert("You need to be logged in!");

    try {
      await axios.put(
        { review_text: reviewText },  
        {
          headers: { Authorization: `Bearer ${token}` },  
        }
      );
      alert("Review added/updated successfully!");

      
      axios
        .get(`http://localhost:5001/api/v1/books/${bookId}/reviews`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data && Array.isArray(response.data.bookReview)) {
            setReviews(response.data.bookReview);  
          }
        });
    } catch (error) {
      console.error("Error adding/updating review", error);
      alert("Error adding/updating review");
    }
  };

  
  const handleReviewDelete = async (reviewId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You need to be logged in!");

    try {
      await axios.delete(
        `http://localhost:5001/api/v1/books/${bookId}/reviews/${reviewId}`,  
        {
          headers: { Authorization: `Bearer ${token}` },  
        }
      );

      
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review", error);
      alert("Error deleting review");
    }
  };
  
  return (
    <div className="container mt-5">
      
      <div className="card mb-4">
        <div className="card-header">
          <h3>Write a Review</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-3">
              <label htmlFor="reviewText" className="form-label">Your Review</label>
              <textarea
                id="reviewText"
                className="form-control"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit Review</button>
          </form>
        </div>
      </div>

      
      <h3>Existing Reviews</h3>
      {reviews && reviews.length > 0 ? (
        <div className="list-group">
          {reviews.map((review) => (
            <div key={review.id} className="list-group-item">
              <p><strong>{review.User?.username}</strong>: {review.review_text}</p>
              <button
                onClick={() => handleReviewDelete(review.id)}
                className="btn btn-danger btn-sm"
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No reviews yet for this book.</div>
      )}
    </div>
  );
}

export default ReviewForm;