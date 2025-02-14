import express from 'express'
import { getTimers, getSingleTimer, createTimer, updateTimer, deleteTimer } from '../controllers/timerController';

const router = express.Router();


// get request - read all
router.get("/", getTimers);

// get request - read one
router.get("/:id", getSingleTimer);

// post request - create
router.post("/", createTimer);

// put request - update
router.put("/:id", updateTimer);

// delete request - delete
router.delete("/:id", deleteTimer);

export default router;