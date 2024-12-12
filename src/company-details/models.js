import mongoose from 'mongoose';

const companyDetailsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  fssaiLicense: {
    type: String,
    required: true,
    trim: true,
  },
  fssaiType: {
    type: String,
    required: true,
    trim: true,
  },
  licenseNo: {
    type: String,
    required: true,
    trim: true,
  },
  gst: {
    type: String,
    required: true,
    trim: true,
  },
  panCard: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const CompanyDetails = mongoose.model('CompanyDetails', companyDetailsSchema);

export default CompanyDetails;
