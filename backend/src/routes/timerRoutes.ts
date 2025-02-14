import express from 'express'
import { getTimers, getSingleTimer, createTimer, updateTimer, deleteTimer } from '../controllers/timerController';

const router = express.Router();

router.route('/').get(getTimers).post(createTimer);
router.route('/:id').get(getSingleTimer).put(updateTimer).delete(deleteTimer);

export default router;