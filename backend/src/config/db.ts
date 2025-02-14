import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config({path: '../.env'});

export const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if(MONGO_URI) {
            const conn = await mongoose.connect(MONGO_URI);
            console.log(`MongoDB Connected: ${conn.connection.host}`)
        }
    } catch (error) {
       console.log(error);
       process.exit(1);
    }
}