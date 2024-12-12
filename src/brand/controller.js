import Brand from './models.js';

// Create a new brand
export const createBrand = async (req, res) => {
  const { name, imageUrl, description } = req.body;

  try {
    const brand = new Brand({ name, imageUrl, description });
    await brand.save();
    res.status(201).json({ message: 'Brand created successfully', brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all brands
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single brand by ID
export const getBrandById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a brand
export const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name, imageUrl, description } = req.body;

  try {
    const brand = await Brand.findByIdAndUpdate(
      id,
      { name, imageUrl, description },
      { new: true }
    );
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json({ message: 'Brand updated successfully', brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a brand
export const deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
