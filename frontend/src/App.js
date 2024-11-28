import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import ReviewForm from "./components/ReviewForm";  
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Book Review Application</h1>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route
            path="/books/:id/reviews"
            element={
              <ProtectedRoute>
                <ReviewForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;