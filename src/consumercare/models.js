import mongoose from 'mongoose';

const consumerCareSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  address: {
    building: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { 
      type: String, 
      required: true, 
      match: [/^\d{5,6}$/, 'Invalid pincode'],
    },
  },
}, { timestamps: true });

const ConsumerCare = mongoose.model('ConsumerCare', consumerCareSchema);

export default ConsumerCare;
