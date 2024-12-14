import express from 'express';
import {
  createStorageInstruction,
  getStorageInstructions,
  getStorageInstructionById,
  updateStorageInstruction,
  deleteStorageInstruction,
} from './controller.js';

const router = express.Router();

// Create a new Storage Instruction
router.post('/', createStorageInstruction);

// Get all Storage Instructions
router.get('/', getStorageInstructions);

// Get a single Storage Instruction by ID
router.get('/:id', getStorageInstructionById);

// Update a Storage Instruction
router.put('/:id', updateStorageInstruction);

// Delete a Storage Instruction
router.delete('/:id', deleteStorageInstruction);

export default router;
