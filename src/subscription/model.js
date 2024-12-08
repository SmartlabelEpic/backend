import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  labelCount: { type: Number, default: 0 }, // Number of labels the user has subscribed to
  subscriptionType: { 
    type: String, 
    enum: ['basic', 'standard', 'premium'], 
    required: true 
  },
  active: { type: Boolean, default: true }, // Status of the subscription
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
