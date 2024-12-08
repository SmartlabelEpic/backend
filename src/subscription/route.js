import express from 'express';
import { 
  createSubscription, 
  getAllSubscriptions, 
  getSubscriptionByUserId, 
  updateSubscription, 
  deleteSubscription 
} from './controller.js';

const router = express.Router();

// Create a new subscription
router.post('/subscriptions', createSubscription);

// Get all subscriptions
router.get('/subscriptions', getAllSubscriptions);

// Get subscription by user ID
router.get('/subscriptions/user/:userId', getSubscriptionByUserId);

// Update a subscription
router.put('/subscriptions/:id', updateSubscription);

// Delete a subscription
router.delete('/subscriptions/:id', deleteSubscription);

export default router;
