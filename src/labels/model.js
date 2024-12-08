import mongoose from 'mongoose';

const fssaiCategories = [
  'Dairy Products',
  'Cereals and Pulses',
  'Fruits and Vegetables',
  'Meat and Meat Products',
  'Fish and Fish Products',
  'Fats and Oils',
  'Sweeteners',
  'Beverages',
  'Snacks and Confectionery',
  'Packaged Foods'
];

const statusValues = ['active', 'inactive', 'pending']; 

const labelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mrp: { type: Number, required: true },
  netWeight: { type: String, required: true },
  netQuantity: { type: String, required: true },
  servingSize: { type: String, required: true },
  calories: { type: Number, required: true },
  energy: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  iron: { type: Number, required: true },
  calcium: { type: Number, required: true },
  plasticManagement: { type: String },
  flavour: { type: String },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  isProprietary: { type: Boolean, required: true },
  fssaiCategory: {
    type: String,
    enum: fssaiCategories,
    required: true
  },
  foodName: { type: String, required: true },
  otherInformation: { type: String },
  brand: { type: String },
  additives: [{
    className: { type: String },
    additiveName: { type: String }
  }],
  isVegetarian: { type: String, enum: ['veg', 'nonveg', 'vegan', 'egg'] },
  isOrganic: { type: Boolean },
  agmarkCertified: { type: Boolean },
  teaBoardCertified: { type: Boolean },
  indiaTeaCertified: { type: Boolean },
  bisCertified: { type: Boolean },
  isFortified: { type: Boolean },
  isIrradiated: { type: Boolean },
  contains: [{ type: String }],
  mayContain: [{ type: String }],
  targetAudience: { type: String },
  ageGroup: { type: String },
  transfatFree: { type: Boolean },
  manufacturedBy: { type: String },
  packedBy: { type: String },
  marketedBy: { type: String },
  productImported: { type: Boolean },
  consumerCareAddress: {
    address: { type: String },
    email: { type: String },
    phoneNumber: { type: String }
  },
  instructionOfUse: { type: String },
  storageInstructions: { type: String },
  madeInIndia: { type: Boolean },
  packagingDetails: {
    packShape: { type: String, enum: ['Rectangle/Square', 'Cylindrical/Round/Oval'] },
    packDimensions: { height: { type: Number }, unit: { type: String, enum: ['cm', 'mm'] } },
    labelDimensions: { height: { type: Number }, width: { type: Number } }
  },
  skuDetails: {
    mrp: { type: Number },
    usp: { costPerUnit: { type: Number }, unit: { type: String } }
  },
  dateOfPackaging: { type: Date },
  expiryDate: { type: Date },
  batchNumber: { type: String },
  barCode: {
    hasBarCode: { type: Boolean },
    barCodeNumber: { type: String }
  },
  sweeteners: {
    plantStanolEsters: { type: Boolean },
    isomaltulose: { type: Boolean },
    annattoColour: { type: Boolean },
    polyols: { type: Boolean },
    polydextrose: { type: Boolean },
    addedCaffeine: { type: Boolean },
    sorbitol: { type: Boolean },
    trehalose: { type: Boolean },
    monosodiumGlutamate: { type: Boolean },
    addedDietaryFibre: { type: Boolean },
    aspartame: { type: Boolean },
    acesulfamePotassium: { type: Boolean },
    aspartameAcesulfameSalt: { type: Boolean },
    saccharins: { type: Boolean },
    sucralose: { type: Boolean },
    neotame: { type: Boolean },
    steviaGlycoside: { type: Boolean }
  },
  status: {
    type: String,
    enum: statusValues,
    default: 'active' 
  }
  
});

const Label = mongoose.model('Label', labelSchema);

export default Label;
