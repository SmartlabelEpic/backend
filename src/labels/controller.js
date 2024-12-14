import Label from './model.js';

// Create a Label
export const createLabel = async (req, res) => {
  try {
    const labelData = { ...req.body, user: req.user.id }; // Add user ID to label data
    const newLabel = new Label(labelData);
    await newLabel.save();
    res.status(201).json(newLabel);
  } catch (error) {
    res.status(500).json({ message: 'Error creating label', error });
  }
};

// Get all Labels for the logged-in user
export const getAllLabels = async (req, res) => {
  try {
    const labels = await Label.find({ user: req.user.id }); // Filter by user ID
    res.status(200).json(labels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching labels', error });
  }
};

// Get a Label by ID for the logged-in user
export const getLabelById = async (req, res) => {
  try {
    const { id } = req.params;
    const label = await Label.findOne({ _id: id, user: req.user.id }); // Filter by user ID
    if (!label) return res.status(404).json({ message: 'Label not found' });
    res.status(200).json(label);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching label', error });
  }
};

// Update a Label for the logged-in user
export const updateLabel = async (req, res) => {
  try {
    const { id } = req.params;
    const labelData = req.body;
    const updatedLabel = await Label.findOneAndUpdate(
      { _id: id, user: req.user.id }, // Ensure the label belongs to the user
      labelData,
      { new: true }
    );
    if (!updatedLabel) return res.status(404).json({ message: 'Label not found' });
    res.status(200).json(updatedLabel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating label', error });
  }
};

// Delete a Label for the logged-in user
export const deleteLabel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLabel = await Label.findOneAndDelete({
      _id: id,
      user: req.user.id, // Ensure the label belongs to the user
    });
    if (!deletedLabel) return res.status(404).json({ message: 'Label not found' });
    res.status(200).json({ message: 'Label deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting label', error });
  }
};
