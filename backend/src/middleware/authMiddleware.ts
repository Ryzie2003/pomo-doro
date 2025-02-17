import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel'
import asyncHandler from 'express-async-handler';
import { Response } from 'express'
import { IGetUserAuthInfoRequest } from '../utils/definitions';

const protect = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response, next) => {
    let token;
    const auth = req.headers.authorization;

    if(auth && auth.startsWith('Bearer')) {
        try {
            // get token from header
            token = auth.split(' ')[1];

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from token
            const user = await userModel.findById(decoded.mima).select('-password');

            req.user = user;
            
            
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    } 

    if (!auth) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

export {protect};