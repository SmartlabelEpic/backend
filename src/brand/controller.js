import Brand from './models.js';

// Create a new brand with user reference
export const createBrand = async (req, res) => {
  const { name, imageUrl, description } = req.body;
  const userId = req.user.id; // Assuming the user is in req.user

  try {
    const brand = new Brand({
      name,
      imageUrl,
      description,
      user: userId, // Save the user reference in the brand document
    });

    await brand.save();
    res.status(201).json({ message: 'Brand created successfully', brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all brands (filtered by the authenticated user)
export const getBrands = async (req, res) => {
  const userId = req.user.id;
  console.log(userId, 'dlkfjal')

  try {
    const brands = await Brand.find({ user: userId }); // Only fetch brands for the authenticated user
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single brand by ID (only if it's the user's brand)
export const getBrandById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const brand = await Brand.findOne({ _id: id, user: userId }); // Ensure the brand belongs to the user
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found or you do not have access' });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a brand (only if it belongs to the authenticated user)
export const updateBrand = async (req, res) => {
  console.log('updatebrand')
  const { id } = req.params;
  const { name, imageUrl, description } = req.body;
  const userId = req.user.id;
  console.log(userId, id, 'fak')

  try {
    const brand = await Brand.findOneAndUpdate(
      { _id: id, user: userId }, // Only allow update if the brand belongs to the user
      { name, imageUrl, description },
      { new: true }
    );

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found or you do not have access' });
    }

    res.status(200).json({ message: 'Brand updated successfully', brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a brand (only if it belongs to the authenticated user)
export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  console.log(userId, id, 'fak')
  try {
    const brand = await Brand.findOneAndDelete({ _id: id, user: userId }); // Ensure the brand belongs to the user
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found or you do not have access' });
    }
    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
