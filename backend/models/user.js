import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

const user = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Automatically increments the value
      primaryKey: true, // Primary key
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Username should be unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export default user;