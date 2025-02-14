import asyncHandler from 'express-async-handler';

export const getTimers = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: "read timers"});
})

export const getSingleTimer = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `timer with id ${req.params.id} read`});
})

export const createTimer = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error(`Please add a text field.`);
    }
    res.status(201).json({ msg: `timer created`});
})

export const updateTimer = asyncHandler(async (req, res) => {
    res.status(201).json({ msg: `timer with id ${req.params.id} updated. `});
})

export const deleteTimer = asyncHandler(async (req, res) => {
    res.status(201).json({ msg: `timer with id ${req.params.id} deleted. `});
})