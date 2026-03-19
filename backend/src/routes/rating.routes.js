import express from 'express';
import { submitRating } from '../controllers/rating.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Only normal users can submit ratings
router.post('/', authMiddleware, roleMiddleware(['NORMAL_USER']), submitRating);

export default router;
