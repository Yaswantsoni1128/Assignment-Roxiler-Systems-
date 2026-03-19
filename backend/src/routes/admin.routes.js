import express from 'express';
import { getDashboardStats, createUser, createStore, getUsersList, getStoresList } from '../controllers/admin.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware, roleMiddleware(['SYSTEM_ADMINISTRATOR']));

router.get('/dashboard', getDashboardStats);
router.post('/users', createUser);
router.post('/stores', createStore);
router.get('/users', getUsersList);
router.get('/stores', getStoresList);

export default router;
