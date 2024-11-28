import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connection.js"; // Ensure correct path to connection.js
import cors from "cors";

// Import routes
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/book.js";
import reviewRoutes from "./routes/review.js";
import notFoundHandler from "./middleware/not-found.js";

dotenv.config();

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
const baseURL = "/api/v1";
app.use(baseURL, authRoutes);
app.use(baseURL, bookRoutes);
app.use(baseURL, reviewRoutes);

// Error handler
app.use(notFoundHandler);

// Connect to the database and start the server
connectDB();  // Ensure the connection function is called

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});