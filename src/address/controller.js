import Address from './models.js';

// Create a new address
export const createAddress = async (req, res) => {
  const {
    name, building, roomNo, street, city, state, country, pincode, email, contact,
  } = req.body;

  try {
    // Use req.user to get the authenticated user's ID
    const userId = req.user.id;

    // Create new address with the user reference
    const address = new Address({
      name,
      building,
      roomNo,
      street,
      city,
      state,
      country,
      pincode,
      email,
      contact,
      user: userId, // Reference to the authenticated user
    });

    await address.save();
    res.status(201).json({ message: 'Address created successfully', address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an address by ID
export const getAddressById = async (req, res) => {
  const { id } = req.params;

  try {
    // Use req.user to get the authenticated user's ID
    const userId = req.user.id;

    // Find the address by ID and ensure it belongs to the authenticated user
    const address = await Address.findOne({ _id: id, user: userId });

    if (!address) {
      return res.status(404).json({ message: 'Address not found or unauthorized' });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update an address
export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const {
    name, building, roomNo, street, city, state, country, pincode, email, contact,
  } = req.body;

  try {
    // Use req.user to get the authenticated user's ID
    const userId = req.user.id;

    // Find and update the address, ensuring the user is the owner of the address
    const address = await Address.findOneAndUpdate(
      { _id: id, user: userId }, // Ensure the address belongs to the user
      {
        name,
        building,
        roomNo,
        street,
        city,
        state,
        country,
        pincode,
        email,
        contact,
        user: userId, // Update the user reference
      },
      { new: true },
    );

    if (!address) {
      return res.status(404).json({ message: 'Address not found or unauthorized' });
    }

    res.status(200).json({ message: 'Address updated successfully', address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  const { id } = req.params;

  try {
    // Use req.user to get the authenticated user's ID
    const userId = req.user.id;

    // Find and delete the address, ensuring it belongs to the user
    const address = await Address.findOneAndDelete({ _id: id, user: userId });

    if (!address) {
      return res.status(404).json({ message: 'Address not found or unauthorized' });
    }

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
