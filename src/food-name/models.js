// models/FoodName.js
import mongoose from 'mongoose';

const foodNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const foodName = mongoose.model('FoodName', foodNameSchema);
export default foodName;
