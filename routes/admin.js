import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

import { ApiKeyVerifier } from '../middleware/apiKeyVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import LogsController from '../controllers/LogsController.js';
import PowerController from '../controllers/PowerController.js';

const logsController = new LogsController();
const powerController = new PowerController();

// Logs

router.get('/logs', ApiKeyVerifier, HandleErrors(logsController.getLogs));
router.get('/logs/:id', ApiKeyVerifier, HandleErrors(logsController.getLogById));
router.get('/logs/watering', ApiKeyVerifier, HandleErrors(logsController.getWateringLogs));

router.delete('/logs/:id', ApiKeyVerifier, HandleErrors(logsController.deleteLogById));

// Power

router.get('/', ApiKeyVerifier, HandleErrors(powerController.health));
router.get('/outlet-status', ApiKeyVerifier, HandleErrors(powerController.outletStatus));
router.get('/cycle-outlet/on-off', ApiKeyVerifier, HandleErrors(powerController.cycleOutletOnOff));

export default router;