import express from 'express';
import {
  createCompanyDetails,
  getCompanyDetails,
  getCompanyDetailsById,
  updateCompanyDetails,
  deleteCompanyDetails,
} from './controller.js';

const router = express.Router();

// Create new company details
router.post('/', createCompanyDetails);

// Get all company details
router.get('/', getCompanyDetails);

// Get a company details by ID
router.get('/:id', getCompanyDetailsById);

// Update company details
router.put('/:id', updateCompanyDetails);

// Delete company details
router.delete('/:id', deleteCompanyDetails);

export default router;
