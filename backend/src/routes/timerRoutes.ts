import express from 'express'
import { getUsers, signupUser, loginUser, deleteUser, getMe, updateUser } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import { createTimer, deleteTimer, getTimer, updateTimer } from '../controllers/timerController';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users/login',protect, loginUser);
router.route('/users/signup').post(signupUser);

//timer routes
router.route('/users/timer/:id').get(protect, getTimer).put(protect, updateTimer).delete(protect, deleteTimer).post(protect, createTimer);

//user routes
router.route('/users/:id').get(protect, getMe).put(protect, updateUser).delete(protect, deleteUser);

export default router;