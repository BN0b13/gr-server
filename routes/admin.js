import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

// import { AdminTokenVerifier } from '../middleware/adminTokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import PowerController from '../controllers/PowerController.js';

const powerController = new PowerController();

// Power

router.get('/', HandleErrors(powerController.health));

router.get('/pumps', HandleErrors(powerController.cyclePumps));

export default router;