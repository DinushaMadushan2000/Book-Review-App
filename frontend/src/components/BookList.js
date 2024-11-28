import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books", error));
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;