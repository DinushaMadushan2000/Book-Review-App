import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

const book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Automatically increments the value
      primaryKey: true, // Primary key
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // ISBN should be unique
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export default book;