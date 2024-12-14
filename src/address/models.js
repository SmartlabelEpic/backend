import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the User model
    required: true, // Optional, depending on whether the user is required
  },
  name: {
    type: String,
    required: true
  }, // e.g., "John Doe"
  building: {
    type: String,

  }, // e.g., "Sunrise Tower"
  roomNo: {
    type: String,

  }, // e.g., "A-203"
  street: {
    type: String,
   
  }, // e.g., "123 Main Street"
  city: {
    type: String,
    required: true
  }, // e.g., "New York"
  state: {
    type: String,
    required: true
  }, // e.g., "NY"
  country: {
    type: String,
    required: true
  }, // e.g., "USA"
  pincode: {
    type: String,
    required: true,
    match: [/^\d{5,6}$/, 'Invalid pincode']
  }, // e.g., "12345"
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  }, // e.g., "john.doe@example.com"
  contact: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number']
  }, // e.g., "9876543210"
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

export default Address;
