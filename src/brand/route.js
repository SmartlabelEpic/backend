import express from 'express';
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from './controller.js';

const router = express.Router();

// Create a new brand
router.post('/', createBrand);

// Get all brands
router.get('/', getBrands);

// Get a brand by ID
router.get('/:id', getBrandById);

// Update a brand by ID
router.put('/:id', updateBrand);

// Delete a brand by ID
router.delete('/:id', deleteBrand);

export default router;