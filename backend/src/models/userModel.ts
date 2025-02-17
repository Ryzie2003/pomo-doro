import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add your username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    weeklyArray: {
        type: [Number],
        required: true
    }
}, {
    timestamps: true
})

export const userModel = mongoose.model('User', userSchema);