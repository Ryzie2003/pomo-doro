import { Request } from 'express'
import { userModel } from '../models/userModel'

export interface IGetUserAuthInfoRequest extends Request {
    user?: any;
}