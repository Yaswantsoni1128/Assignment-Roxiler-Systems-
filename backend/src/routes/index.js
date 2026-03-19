import express from 'express';
import authRoutes from './auth.routes.js';
import storeRoutes from './store.routes.js';
import ratingRoutes from './rating.routes.js';
import adminRoutes from './admin.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/stores', storeRoutes);
router.use('/ratings', ratingRoutes);
router.use('/admin', adminRoutes);

export default router;
