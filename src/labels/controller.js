import Label from './model.js';

export const createLabel = async (req, res) => {
  try {
    const labelData = req.body;
    const newLabel = new Label(labelData);
    await newLabel.save();
    res.status(201).json(newLabel);
  } catch (error) {
    res.status(500).json({ message: 'Error creating label', error });
  }
};

export const getAllLabels = async (req, res) => {
  try {
    const labels = await Label.find();
    res.status(200).json(labels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching labels', error });
  }
};

export const getLabelById = async (req, res) => {
  try {
    const { id } = req.params;
    const label = await Label.findById(id);
    if (!label) return res.status(404).json({ message: 'Label not found' });
    res.status(200).json(label);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching label', error });
  }
};

export const updateLabel = async (req, res) => {
  try {
    const { id } = req.params;
    const labelData = req.body;
    const updatedLabel = await Label.findByIdAndUpdate(id, labelData, { new: true });
    if (!updatedLabel) return res.status(404).json({ message: 'Label not found' });
    res.status(200).json(updatedLabel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating label', error });
  }
};

export const deleteLabel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLabel = await Label.findByIdAndDelete(id);
    if (!deletedLabel) return res.status(404).json({ message: 'Label not found' });
    res.status(200).json({ message: 'Label deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting label', error });
  }
};
