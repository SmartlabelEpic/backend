import express from 'express';
import { createLabel, getAllLabels, getLabelById, updateLabel, deleteLabel } from './controller.js';
import upload from '../config/upload.js';

const router = express.Router();

router.post('/labels', createLabel);
router.get('/labels', getAllLabels);
router.get('/labels/:id', getLabelById);
router.put('/labels/:id', upload.single("barcode_image"), updateLabel);
router.delete('/labels/:id', deleteLabel);

export default router;
