import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);  // Ensure books is initialized as an empty array

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/books")
      .then((response) => setBooks(response.data))  // Set books after fetching
      .catch((error) => console.error("Error fetching books", error));
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {/* Safely map over books */}
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>{book.title}</Link>
            </li>
          ))
        ) : (
          <p>No books available</p>  // Show a message when there are no books
        )}
      </ul>
    </div>
  );
}

export default BookList;