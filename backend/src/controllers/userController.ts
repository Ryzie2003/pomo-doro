import asyncHandler from 'express-async-handler';
import { userModel } from '../models/userModel';

export const getUsers = asyncHandler(async (req, res) => {
    const timers = await userModel.find();

    res.status(200).json(timers);
})

export const getUserTimer = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({msg: `weekly studied time array: [${user?.weeklyArray}]`});
})

export const signup = asyncHandler(async (req, res) => {
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

export const deleteUser = asyncHandler(async (req, res) => {
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

// update timer object for user
export const updateTimer = asyncHandler(async (req, res) => {
    // find the user with req.params.id
    const user = await userModel.findById(req.params.id);

    // error check
    if (user) {
        // update the user's timer in front end
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(updatedUser);
    } else {
        res.status(400);
        throw new Error(`Could not find user with ${req.params.id}`)
    }
})