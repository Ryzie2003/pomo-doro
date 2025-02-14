import asyncHandler from 'express-async-handler';
import { userModel } from '../models/userModel';

export const getTimers = asyncHandler(async (req, res) => {
    const timers = await userModel.find();

    res.status(200).json(timers);
})

export const getSingleTimer = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `timer with id ${req.params.id} read`});
})

export const createTimer = asyncHandler(async (req, res) => {
    const createUser = await userModel.create({
        username: req.body.username,
        password: req.body.password,
        weeklyArray: [1, 2, 3],
    })
    if (!req.body.username) {
        res.status(400);
        throw new Error(`Please add a text field.`);
    }
    res.status(201).json(createUser);
})

export const updateTimer = asyncHandler(async (req, res) => {
    // find the user with req.params.id
    const user = await userModel.findById(req.params.id);

    // error check
    if (user) {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(updatedUser);
    } else {
        res.status(400);
        throw new Error(`Could not find user with ${req.params.id}`)
    }

    // update the user with req.params.id
})

export const deleteTimer = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);

    // error check
    if (user) {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id)
        res.status(201).json({msg: `Deleted user: ${deletedUser}`});
    } else {
        res.status(400);
        throw new Error(`Could not find user with ${req.params.id}`)
    }
})