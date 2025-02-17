import asyncHandler from 'express-async-handler';
import { userModel } from '../models/userModel';
import { timerModel } from '../models/timerModel';
import { IGetUserAuthInfoRequest } from '../utils/definitions';


// Read timer
// GET /api/users/timer/:id
export const getTimer = asyncHandler(async (req: IGetUserAuthInfoRequest, res) => {
    const timers = await timerModel.find({user: req.user.id});
    res.status(200).json(timers);
})

// Create timer
// POST /api/users/timer/:id
export const createTimer = asyncHandler(async (req: IGetUserAuthInfoRequest, res) => {
    if (!req.body.weeklyTimes) {
        res.status(400);
        throw new Error('Please add a weeklyTimes array');
    }

    const userTimer = await timerModel.find({user: req.user.id});
    
    if (userTimer.length !== 0) {
        res.status(400);
        throw new Error('Weekly array already created');
    }

    const times = await timerModel.create({
        weeklyTimes: req.body.weeklyTimes,
        user: req.user.id
    })

    res.status(201).json(times);
})

// Update timer
// PUT /api/users/timer/:id
export const updateTimer = asyncHandler(async (req: IGetUserAuthInfoRequest, res) => {
    // find the timer with req.params.id
    const timer = await timerModel.findById(req.params.id);

    // error check
    if (timer) {
        const user = await userModel.findById(req.user.id);

        //check for user
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }
        
        //make sure the logged in user matches the timer user
        if (timer.user.toString() !== user.id) {
            res.status(401);
            throw new Error('Invalid User');
        }

        const updatedTimer = await timerModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedTimer);
    } else {
        res.status(400);
        throw new Error(`Could not find timer associated with user id ${req.params.id}`)
    }

    // update the user with req.params.id
})

// Delete timer
// DELETE /api/users/timer/:id
export const deleteTimer = asyncHandler(async (req: IGetUserAuthInfoRequest, res) => {
    const timer = await timerModel.findById(req.params.id);

    // error check
    if (timer) {
        const user = await userModel.findById(req.user.id);

        //check for user
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }
        
        //make sure the logged in user matches the timer user
        if (timer.user.toString() !== user.id) {
            res.status(401);
            throw new Error('Invalid User');
        }

        const deletedTimer = await timerModel.findByIdAndDelete(req.params.id);
        res.status(200).json({deletedTimer: deletedTimer});
    } else {
        res.status(400);
        throw new Error(`Could not find timer associated with user id ${req.params.id}`)
    }
})