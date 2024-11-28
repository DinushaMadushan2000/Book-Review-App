import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";
import user from "./user.js";
import book from "./book.js";

const review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Automatically increments the value
      primaryKey: true, // Primary key
    },
    review_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Define associations
user.belongsToMany(book, { through: review }); // A user can review many books
book.belongsToMany(user, { through: review }); // A book can have many reviewers

review.belongsTo(user); // Associate reviews with a user
review.belongsTo(book); // Associate reviews with a book

export default review;