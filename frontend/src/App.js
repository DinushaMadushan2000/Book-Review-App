import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import ReviewForm from "./components/ReviewForm";  
import ProtectedRoute from "./components/ProtectedRoute"; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        
        <div className="container text-center my-5">
          <h1>Book Review Application</h1>
        </div>

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