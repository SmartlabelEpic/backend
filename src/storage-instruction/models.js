import mongoose from 'mongoose';

const storageInstructionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const StorageInstruction = mongoose.model('StorageInstruction', storageInstructionSchema);

export default StorageInstruction;
