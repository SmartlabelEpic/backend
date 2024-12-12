import Address from './models.js';

// Create a new address
export const createAddress = async (req, res) => {
  const {
    name, building, roomNo, street, city, state, country, pincode, email, contact,
  } = req.body;

  try {
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
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
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
    const address = await Address.findByIdAndUpdate(
      id,
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
      },
      { new: true },
    );
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
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
    const address = await Address.findByIdAndDelete(id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
