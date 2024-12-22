// routes/foodNameRoutes.js
import express from 'express';
import { getFoodNames, createFoodName, deleteFoodName } from './controllers.js';
import authenticateUser from '../../middleware/authentication.js';

const router = express.Router();

router.get('/', authenticateUser, getFoodNames);
router.post('/', authenticateUser, createFoodName);
router.delete('/:id', authenticateUser, deleteFoodName);

export default router;
