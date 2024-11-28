import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReviewForm({ bookId }) {
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
     
      navigate("/login");
    }
  }, [navigate]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You need to be logged in!");

    try {
      await axios.put(
        `http://localhost:5001/api/v1/books/${bookId}/reviews`,
        { review_text: reviewText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Review added/updated successfully!");
    } catch (error) {
      console.error("Error adding/updating review", error);
      alert("Error adding/updating review");
    }
  };

  return (
    <form onSubmit={handleReviewSubmit}>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here"
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;