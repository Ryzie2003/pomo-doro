import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";

// import routes
import routes from "./routes/timerRoutes";
import mongoose from "mongoose";

connectDB();

dotenv.config({path: '../.env'});
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use('/api/users', routes)
app.use(errorHandler);


// Connect to MongoDB


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
