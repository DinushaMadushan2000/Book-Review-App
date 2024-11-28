import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";

function BookDetail() {
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/v1/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => console.error("Error fetching book details", error));

    axios
      .get(`http://localhost:5001/api/v1/books/${id}/reviews`)
      .then((response) => {
        setReviews(response.data.bookReview);
      })
      .catch((error) => console.error("Error fetching reviews", error));
  }, [id]);

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.ISBN}</p>

      <h3>Reviews</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review.review_text}</li>
        ))}
      </ul>

      <ReviewForm bookId={id} />
    </div>
  );
}

export default BookDetail;