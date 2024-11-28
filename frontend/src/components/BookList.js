import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function BookList() {
  const [books, setBooks] = useState([]);  

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/books")
      .then((response) => setBooks(response.data))  
      .catch((error) => console.error("Error fetching books", error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Book List</h2>
      {books.length > 0 ? (
        <div className="list-group">
          
          {books.map((book) => (
            <Link 
              key={book.id} 
              to={`/books/${book.id}`} 
              className="list-group-item list-group-item-action"
            >
              {book.title}
            </Link>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          No books available
        </div>  
      )}
    </div>
  );
}

export default BookList;