import express from 'express';
import { getStores, getStoreDashboard } from '../controllers/store.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Get stores list with average rating and user's rating (accessible to all logged in users, normally just NORMAL_USER but let's allow all)
router.get('/', authMiddleware, getStores);

// Get specific store dashboard (only for STORE_OWNER)
router.get('/dashboard', authMiddleware, roleMiddleware(['STORE_OWNER']), getStoreDashboard);

export default router;
