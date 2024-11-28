import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5">
      
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="text-center">Book Details</h3>
        </div>
        <div className="card-body">
          <h4 className="card-title">{book.title}</h4>
          <p className="card-text"><strong>Author:</strong> {book.author}</p>
          <p className="card-text"><strong>ISBN:</strong> {book.ISBN}</p>
        </div>
      </div>

     
      <div className="reviews-section">
        <h4>Reviews</h4>
        {reviews && reviews.length > 0 ? (
          <div className="list-group">
            {reviews.map((review) => (
              <div key={review.id} className="list-group-item">
                <p><strong>{review.User?.username}:</strong> {review.review_text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info">No reviews yet for this book.</div>
        )}
      </div>

      
      <ReviewForm bookId={id} />
    </div>
  );
}

export default BookDetail;