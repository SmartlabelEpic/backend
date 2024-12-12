import express from 'express';
import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from './controller.js';

const router = express.Router();

// Create a new address
router.post('/', createAddress);

// Get all addresses
router.get('/', getAddresses);

// Get an address by ID
router.get('/:id', getAddressById);

// Update an address by ID
router.put('/:id', updateAddress);

// Delete an address by ID
router.delete('/:id', deleteAddress);

export default router;
