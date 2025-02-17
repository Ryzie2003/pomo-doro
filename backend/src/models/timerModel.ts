import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const timerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    weeklyTimes: {
        type: [Number],
        required: [true, 'Please add your username'],
        sparse: true,
    },
}, {
    timestamps: true
})

export const timerModel = mongoose.model('Timer', timerSchema);