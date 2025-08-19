import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";

import authRoutes from "./routes/auth.route.js"
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;

// Middleware should come before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Basic error handling
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
  