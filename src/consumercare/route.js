import express from 'express';
import {
  createConsumerCare,
  getConsumerCareRecords,
  getConsumerCareById,
  updateConsumerCare,
  deleteConsumerCare,
} from './controller.js';

const router = express.Router();

// Create a Consumer Care record
router.post('/', createConsumerCare);

// Get all Consumer Care records
router.get('/', getConsumerCareRecords);

// Get a Consumer Care record by ID
router.get('/:id', getConsumerCareById);

// Update a Consumer Care record
router.put('/:id', updateConsumerCare);

// Delete a Consumer Care record
router.delete('/:id', deleteConsumerCare);

export default router;
