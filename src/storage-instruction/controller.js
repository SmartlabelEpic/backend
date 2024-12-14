import StorageInstruction from './models.js';

// Create a new Storage Instruction
export const createStorageInstruction = async (req, res) => {
  const { description } = req.body;

  try {
    const storageInstruction = new StorageInstruction({
      description,
      user: req.user.id, // Associate with the logged-in user
    });
    await storageInstruction.save();
    res.status(201).json({
      message: 'Storage Instruction created successfully',
      storageInstruction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Storage Instructions for the logged-in user
export const getStorageInstructions = async (req, res) => {
  try {
    const storageInstructions = await StorageInstruction.find({ user: req.user.id }); // Filter by user ID
    res.status(200).json(storageInstructions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Storage Instruction by ID (for the logged-in user)
export const getStorageInstructionById = async (req, res) => {
  const { id } = req.params;

  try {
    const storageInstruction = await StorageInstruction.findOne({ _id: id, user: req.user.id }); // Check ownership
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
    const storageInstruction = await StorageInstruction.findOneAndUpdate(
      { _id: id, user: req.user.id }, // Check ownership
      { description },
      { new: true }
    );
    if (!storageInstruction) {
      return res.status(404).json({ message: 'Storage Instruction not found' });
    }
    res.status(200).json({
      message: 'Storage Instruction updated successfully',
      storageInstruction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Storage Instruction
export const deleteStorageInstruction = async (req, res) => {
  const { id } = req.params;

  try {
    const storageInstruction = await StorageInstruction.findOneAndDelete({
      _id: id,
      user: req.user.id, // Check ownership
    });
    if (!storageInstruction) {
      return res.status(404).json({ message: 'Storage Instruction not found' });
    }
    res.status(200).json({ message: 'Storage Instruction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
