import express from 'express';
import {
    reminderController,
    existingReminder,
    delReminder
} from '../controllers/reminderController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router()
//routing
//REGISTER||POST
router.post('/newReminder', reminderController);

// LOGIN/POST
router.get('/existingReminder/:Uid', existingReminder);
// router.get('/test', requireSignIn, testController);
router.delete('/delReminder/:Rid', delReminder);


export default router;