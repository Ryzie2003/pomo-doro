import express from 'express'
import { getUsers, getUserTimer, signup, updateTimer, deleteUser } from '../controllers/userController';

const router = express.Router();

router.route('/').get(getUsers).post(signup);
router.route('/:id').get(getUserTimer).put(updateTimer).delete(deleteUser);

export default router;