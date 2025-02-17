import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { userModel } from '../models/userModel';
import { IGetUserAuthInfoRequest } from '../utils/definitions';
import { Response } from 'express'

export const getUsers = asyncHandler(async (req, res) => {
    const timers = await userModel.find();

    res.status(200).json(timers);
})

export const signupUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        res.status(400);
        throw new Error("please enter all fields");
    }

    // check if user already exists
    const userExists = await userModel.findOne({email});

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if(userExists) {
        res.status(400);
        throw new Error("User already exists. Please login using your email.")
    } else {
        const createUser = await userModel.create({
            username: username,
            password: hashedPassword,
            email: email,
        })
        res.status(201).json({...createUser, token: generateToken(createUser._id)});
    }
})

export const loginUser = asyncHandler(async (req, res) => {
    // get email and password entered
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error('Please enter email and password.')
    }

    // validate email through mongoDB
    const userFound = await userModel.findOne({email});
    
    if(userFound && (await bcrypt.compare(password, userFound.password))) {
        res.status(200).json({
            _id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            token: generateToken(userFound._id),
            msg: "Login Successful"
        });
    } else {
        res.status(400);
        throw new Error('Invalid Credentials');
    }
})

// user gets own info
export const getMe = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = await userModel.findById(req.user.id).select('_id username email');
    const _id = user?._id;
    const email = user?.email;
    const username = user?.username;

    res.status(200).json({
        _id,
        username,
        email
    })
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

export const updateUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);

    // error check
    if (user) {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(201).json({msg: `Updated user: ${updatedUser}`});
    } else {
        res.status(400);
        throw new Error(`Could not find user with ${req.params.id}`)
    }
})

// Generate JWT
const generateToken = (mima) => {
    return jwt.sign({ mima }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}