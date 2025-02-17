import express from 'express'
import { getUsers, getUserTimer, signupUser, loginUser, updateTimer, deleteUser } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/users', getUsers);
router.post('/login',protect, loginUser);
router.route('/signup').post(signupUser);
router.route('/users/:id').get(getUserTimer).put(updateTimer).delete(deleteUser);

export default router;