import CompanyDetails from './models.js';

// Create a new company details
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
    });
    await companyDetails.save();
    res.status(201).json({ message: 'Company details created successfully', companyDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all company details
export const getCompanyDetails = async (req, res) => {
  try {
    const companyDetails = await CompanyDetails.find();
    res.status(200).json(companyDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get company details by ID
export const getCompanyDetailsById = async (req, res) => {
  const { id } = req.params;

  try {
    const companyDetails = await CompanyDetails.findById(id);
    if (!companyDetails) {
      return res.status(404).json({ message: 'Company details not found' });
    }
    res.status(200).json(companyDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update company details
export const updateCompanyDetails = async (req, res) => {
  const { id } = req.params;
  const { companyName, fssaiLicense, fssaiType, licenseNo, gst, panCard } = req.body;

  try {
    const companyDetails = await CompanyDetails.findByIdAndUpdate(
      id,
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

// Delete company details
export const deleteCompanyDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const companyDetails = await CompanyDetails.findByIdAndDelete(id);
    if (!companyDetails) {
      return res.status(404).json({ message: 'Company details not found' });
    }
    res.status(200).json({ message: 'Company details deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
