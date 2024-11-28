import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: "mysql",
    }
);

export async function connectDB() {
    try {
        // Test the database connection
        await sequelize.authenticate();
        console.log("Connected to the database successfully!");

        // Sync models (optional)
        await sequelize.sync({ alter: true });
        console.log("Database tables synced successfully!");
    } catch (error) {
        console.log("Failed to connect to the database:", error.message);
        process.exit(1); // Exit if connection fails
    }
}