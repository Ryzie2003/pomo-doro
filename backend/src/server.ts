import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";

// import routes
import routes from "./routes/timerRoutes";

dotenv.config({path: '../.env'});
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use('/api/time', routes)
app.use(errorHandler);


// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI environment variable");
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
