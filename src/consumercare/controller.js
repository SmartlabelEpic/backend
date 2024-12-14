import ConsumerCare from './models.js';

// Create a Consumer Care record
export const createConsumerCare = async (req, res) => {
  const { phone, email, address } = req.body;

  try {
    const consumerCare = new ConsumerCare({
      phone,
      email,
      address,
      user: req.user.id, // Associate with the logged-in user
    });
    await consumerCare.save();
    res.status(201).json({ message: 'Consumer Care record created successfully', consumerCare });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Consumer Care records for the logged-in user
export const getConsumerCareRecords = async (req, res) => {
  try {
    const consumerCareRecords = await ConsumerCare.find({ user: req.user.id }); // Filter by user
    res.status(200).json(consumerCareRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Consumer Care record by ID for the logged-in user
export const getConsumerCareById = async (req, res) => {
  const { id } = req.params;

  try {
    const consumerCare = await ConsumerCare.findOne({ _id: id, user: req.user.id }); // Filter by user
    if (!consumerCare) {
      return res.status(404).json({ message: 'Consumer Care record not found' });
    }
    res.status(200).json(consumerCare);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Consumer Care record for the logged-in user
export const updateConsumerCare = async (req, res) => {
  const { id } = req.params;
  const { phone, email, address } = req.body;

  try {
    const consumerCare = await ConsumerCare.findOneAndUpdate(
      { _id: id, user: req.user.id }, // Ensure user-specific update
      { phone, email, address },
      { new: true }
    );
    if (!consumerCare) {
      return res.status(404).json({ message: 'Consumer Care record not found' });
    }
    res.status(200).json({ message: 'Consumer Care record updated successfully', consumerCare });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Consumer Care record for the logged-in user
export const deleteConsumerCare = async (req, res) => {
  const { id } = req.params;

  try {
    const consumerCare = await ConsumerCare.findOneAndDelete({
      _id: id,
      user: req.user.id, // Ensure user-specific deletion
    });
    if (!consumerCare) {
      return res.status(404).json({ message: 'Consumer Care record not found' });
    }
    res.status(200).json({ message: 'Consumer Care record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
