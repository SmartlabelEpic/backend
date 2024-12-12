import StorageInstruction from './models.js';

// Create a new Storage Instruction
export const createStorageInstruction = async (req, res) => {
  const { description } = req.body;

  try {
    const storageInstruction = new StorageInstruction({ description });
    await storageInstruction.save();
    res.status(201).json({ message: 'Storage Instruction created successfully', storageInstruction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Storage Instructions
export const getStorageInstructions = async (req, res) => {
  try {
    const storageInstructions = await StorageInstruction.find();
    res.status(200).json(storageInstructions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Storage Instruction by ID
export const getStorageInstructionById = async (req, res) => {
  const { id } = req.params;

  try {
    const storageInstruction = await StorageInstruction.findById(id);
    if (!storageInstruction) {
      return res.status(404).json({ message: 'Storage Instruction not found' });
    }
    res.status(200).json(storageInstruction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Storage Instruction
export const updateStorageInstruction = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const storageInstruction = await StorageInstruction.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );
    if (!storageInstruction) {
      return res.status(404).json({ message: 'Storage Instruction not found' });
    }
    res.status(200).json({ message: 'Storage Instruction updated successfully', storageInstruction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Storage Instruction
export const deleteStorageInstruction = async (req, res) => {
  const { id } = req.params;

  try {
    const storageInstruction = await StorageInstruction.findByIdAndDelete(id);
    if (!storageInstruction) {
      return res.status(404).json({ message: 'Storage Instruction not found' });
    }
    res.status(200).json({ message: 'Storage Instruction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
