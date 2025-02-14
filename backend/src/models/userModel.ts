import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    },
    weeklyArray: {
        type: [Number],
        required: true
    }
}, {
    timestamps: true
})

export const userModel = mongoose.model('User', userSchema);