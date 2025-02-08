import CompanyDetails from './models.js';

// Create a new company detail
export const createCompanyDetails = async (req, res) => {
  const { companyName, fssaiLicense, fssaiType, licenseNo, gst, panCard } = req.body;

  try {
    const companyDetails = new CompanyDetails({
      companyName,
      fssaiLicense,
      fssaiType,
      licenseNo,
      gst,
      panCard,
      user: req.user.id, // Associate with the logged-in user
    });
    await companyDetails.save();
    res.status(201).json({ message: 'Company details created successfully', companyDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all company details for the logged-in user
export const getCompanyDetails = async (req, res) => {
  try {
    const companyDetails = await CompanyDetails.find({ user: req.user.id }); // Filter by user
    res.status(200).json(companyDetails);
  } catch (error) {
    console.log(error.message, 'dfka')
    res.status(500).json({ message: error.message });
  }
};

// Get company details by ID for the logged-in user
export const getCompanyDetailsById = async (req, res) => {
  const { id } = req.params;

  try {
    const companyDetails = await CompanyDetails.findOne({ _id: id, user: req.user.id }); // Filter by user
    if (!companyDetails) {
      return res.status(404).json({ message: 'Company details not found' });
    }
    res.status(200).json(companyDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update company details for the logged-in user
export const updateCompanyDetails = async (req, res) => {
  const { id } = req.params;
  const { companyName, fssaiLicense, fssaiType, licenseNo, gst, panCard } = req.body;

  try {
    const companyDetails = await CompanyDetails.findOneAndUpdate(
      { _id: id, user: req.user.id }, // Ensure user-specific update
      { companyName, fssaiLicense, fssaiType, licenseNo, gst, panCard },
      { new: true }
    );
    if (!companyDetails) {
      return res.status(404).json({ message: 'Company details not found' });
    }
    res.status(200).json({ message: 'Company details updated successfully', companyDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete company details for the logged-in user
export const deleteCompanyDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const companyDetails = await CompanyDetails.findOneAndDelete({
      _id: id,
      user: req.user.id, // Ensure user-specific deletion
    });
    if (!companyDetails) {
      return res.status(404).json({ message: 'Company details not found' });
    }
    res.status(200).json({ message: 'Company details deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
