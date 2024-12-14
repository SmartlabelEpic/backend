import mongoose from 'mongoose';

const storageInstructionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the User model
    required: true, // Optional, depending on whether the user is required
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const StorageInstruction = mongoose.model('StorageInstruction', storageInstructionSchema);

export default StorageInstruction;
