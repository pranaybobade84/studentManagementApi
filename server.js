import { configDotenv } from "dotenv";
configDotenv();
import app from "./app.js";
import express from "express";
import { connectDB } from "./config/index.js";
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port ", PORT);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
