import express from 'express';
import { signup, login, updatePassword, getMe } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.patch('/password', authMiddleware, updatePassword);
router.get('/me', authMiddleware, getMe);

export default router;
