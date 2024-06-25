import express from 'express';
import adminRoutes from './admin.js';

const router = express.Router();

router.use('/', adminRoutes);

export default router;