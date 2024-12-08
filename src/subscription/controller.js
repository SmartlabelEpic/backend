import Subscription from './model.js';

// Create a new subscription
export const createSubscription = async (req, res) => {
  try {
    const { user, subscriptionType } = req.body;

    let labelCount = 0;
    let price = 0;

    if (subscriptionType === 'basic') {
      labelCount = 1; // 1 label for ₹2000
      price = 2000;
    } else if (subscriptionType === 'standard') {
      labelCount = 20; // 20 labels for ₹20,000
      price = 20000;
    } else if (subscriptionType === 'premium') {
      labelCount = Infinity; // Unlimited labels
      price = 50000; // Set this price based on your requirements
    }

    // Create a new subscription
    const newSubscription = new Subscription({
      user,
      labelCount,
      subscriptionType,
    });
    
    await newSubscription.save();
    
    res.status(201).json({ message: 'Subscription created successfully', newSubscription, price });
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription', error });
  }
};

// Get all subscriptions
export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('user');
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error });
  }
};

// Get a subscription by user ID
export const getSubscriptionByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const subscription = await Subscription.findOne({ user: userId }).populate('user');
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription', error });
  }
};

// Update a subscription
export const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { subscriptionType } = req.body;

    const updatedSubscription = await Subscription.findByIdAndUpdate(id, { subscriptionType }, { new: true });
    if (!updatedSubscription) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscription', error });
  }
};

// Delete a subscription
export const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubscription = await Subscription.findByIdAndDelete(id);
    if (!deletedSubscription) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscription', error });
  }
};
