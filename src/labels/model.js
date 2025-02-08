import mongoose from 'mongoose';

const fssaiCategories = [
    'Dairy Products', 'Cereals and Pulses', 'Fruits and Vegetables',
    'Fish and Fish Products', 'Fats and Oils', 'Sweeteners',
    'Beverages', 'Snacks and Confectionery', 'Packaged Foods'
];

const statusValues = ['active', 'inactive', 'pending'];

const labelSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    brand: { type: mongoose.Schema.Types.Mixed },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    consumerCare: { type: mongoose.Schema.Types.ObjectId, ref: "ConsumerCare" },
    storageInstructions: { type: mongoose.Schema.Types.ObjectId, ref: "StorageInstruction" },

    // Basic Product Info
    name: { type: mongoose.Schema.Types.Mixed },
    labelName: { type: mongoose.Schema.Types.Mixed },
    mrp: { type: mongoose.Schema.Types.Mixed },
    netWeight: { type: mongoose.Schema.Types.Mixed },
    netQuantity: { type: mongoose.Schema.Types.Mixed },
    servingSize: { type: mongoose.Schema.Types.Mixed },
    serving_size_unit: { type: mongoose.Schema.Types.Mixed },
    calories: { type: mongoose.Schema.Types.Mixed },
    energy: { type: mongoose.Schema.Types.Mixed },
    carbs: { type: mongoose.Schema.Types.Mixed },
    fats: { type: mongoose.Schema.Types.Mixed },
    iron: { type: mongoose.Schema.Types.Mixed },
    calcium: { type: mongoose.Schema.Types.Mixed },
    plasticManagement: { type: mongoose.Schema.Types.Mixed },
    other_nutrient: { type: mongoose.Schema.Types.Mixed },
    ingredients: { type: mongoose.Schema.Types.Mixed },
    flavour: { type: mongoose.Schema.Types.Mixed },
    other_info: { type: mongoose.Schema.Types.Mixed },
    standard_food_name: { type: mongoose.Schema.Types.Mixed },

    // Product Category
    fssaiCategory: { type: mongoose.Schema.Types.Mixed },
    foodName: { type: mongoose.Schema.Types.Mixed },
    proprietary_product: { type: mongoose.Schema.Types.Mixed },
    proprietary_name: { type: mongoose.Schema.Types.Mixed },
    show_fssai: { type: mongoose.Schema.Types.Mixed },
    single_ingredient: { type: mongoose.Schema.Types.Mixed },
    product_is: { type: mongoose.Schema.Types.Mixed },

    // Ingredients & Nutrients
    additives: { type: mongoose.Schema.Types.Mixed },
    total_carb: { type: mongoose.Schema.Types.Mixed },
    total_sugar: { type: mongoose.Schema.Types.Mixed },
    added_sugar: { type: mongoose.Schema.Types.Mixed },
    protein: { type: mongoose.Schema.Types.Mixed },
    total_fat: { type: mongoose.Schema.Types.Mixed },
    sodium: { type: mongoose.Schema.Types.Mixed },
    cholestrol: { type: mongoose.Schema.Types.Mixed },
    trans_fat: { type: mongoose.Schema.Types.Mixed },
    other_nutrient: { type: mongoose.Schema.Types.Mixed },
    serving_size: { type: mongoose.Schema.Types.Mixed },
    serving_size_unit: { type: mongoose.Schema.Types.Mixed },
    age_group: { type: mongoose.Schema.Types.Mixed },
    net_quantity: { type: mongoose.Schema.Types.Mixed },
    net_quantity_unit: { type: mongoose.Schema.Types.Mixed },
    // Packaging Details
    packaging_material: { type: mongoose.Schema.Types.Mixed },
    packagingDetails: { type: mongoose.Schema.Types.Mixed },
    pack_shape: { type: mongoose.Schema.Types.Mixed },
    pack_unit: { type: mongoose.Schema.Types.Mixed },
    pack_height: { type: mongoose.Schema.Types.Mixed },
    pack_width: { type: mongoose.Schema.Types.Mixed },
    label_height: { type: mongoose.Schema.Types.Mixed },
    label_width: { type: mongoose.Schema.Types.Mixed },

    // Manufacturer & Storage Info
    manufactured_by: { type: mongoose.Schema.Types.Mixed },
    packed: { type: mongoose.Schema.Types.Mixed },
    marketed_by: { type: mongoose.Schema.Types.Mixed },
    imported: { type: mongoose.Schema.Types.Mixed },
    instruction_storage: { type: mongoose.Schema.Types.Mixed },
    storage_instruction: { type: mongoose.Schema.Types.Mixed },
    product_made: { type: mongoose.Schema.Types.Mixed },
    consumer_care: { type: mongoose.Schema.Types.Mixed },

    // Certification
    vegetarian: { type: mongoose.Schema.Types.Mixed },
    organic: { type: mongoose.Schema.Types.Mixed },
    agmark_certified: { type: mongoose.Schema.Types.Mixed },
    tea_board_certified: { type: mongoose.Schema.Types.Mixed },
    india_tea_certified: { type: mongoose.Schema.Types.Mixed },
    bis_certified: { type: mongoose.Schema.Types.Mixed },
    fortified: { type: mongoose.Schema.Types.Mixed },
    irradiated: { type: mongoose.Schema.Types.Mixed },
    transfatFree: { type: mongoose.Schema.Types.Mixed },
    natural: { type: mongoose.Schema.Types.Mixed },
    plant_based: { type: mongoose.Schema.Types.Mixed },

    // Allergens & Warnings
    contains_allergens: { type: mongoose.Schema.Types.Mixed },
    contains: { type: mongoose.Schema.Types.Mixed },
    may_contain: { type: mongoose.Schema.Types.Mixed },

    // Consumer Info
    target_audience: { type: mongoose.Schema.Types.Mixed },
    age_group: { type: mongoose.Schema.Types.Mixed },
    consumerCareAddress: { type: mongoose.Schema.Types.Mixed },

    // Product Tracking
    dateOfPackaging: { type: mongoose.Schema.Types.Mixed },
    expiryDate: { type: mongoose.Schema.Types.Mixed },
    batchNumber: { type: mongoose.Schema.Types.Mixed },
    barCode: { type: mongoose.Schema.Types.Mixed },
    barcode_image: { type: mongoose.Schema.Types.Mixed },
    batch_number: { type: mongoose.Schema.Types.Mixed },
    consumer_care: { type: mongoose.Schema.Types.Mixed },

    // Sweeteners & Additives

    plant_stanol_esters: { type: mongoose.Schema.Types.Mixed },
    isomaltulose: { type: mongoose.Schema.Types.Mixed },
    annatto_colour: { type: mongoose.Schema.Types.Mixed },
    polyols_10_or_more: { type: mongoose.Schema.Types.Mixed },
    polydextrose_10_or_more: { type: mongoose.Schema.Types.Mixed },
    added_caffeine: { type: mongoose.Schema.Types.Mixed },
    sorbitol_syrup_10_or_more: { type: mongoose.Schema.Types.Mixed },
    trehalose: { type: mongoose.Schema.Types.Mixed },
    monosodium_glutamate: { type: mongoose.Schema.Types.Mixed },
    added_dietary_fibre: { type: mongoose.Schema.Types.Mixed },
    aspartame_methyl_ester: { type: mongoose.Schema.Types.Mixed },
    acesulfame_potassium: { type: mongoose.Schema.Types.Mixed },
    aspartame_acesulfame_salt: { type: mongoose.Schema.Types.Mixed },
    saccharins: { type: mongoose.Schema.Types.Mixed },
    polyols_10_or_more: { type: mongoose.Schema.Types.Mixed },
    sorbitol: { type: mongoose.Schema.Types.Mixed },
    sucralose: { type: mongoose.Schema.Types.Mixed },
    neotame: { type: mongoose.Schema.Types.Mixed },
    stevia_glycoside: { type: mongoose.Schema.Types.Mixed },
    mixture_of_sweeteners: { type: mongoose.Schema.Types.Mixed },


    // Status & Additional Fields
    status: { type: mongoose.Schema.Types.Mixed, default: 'pending' },
    dop: { type: mongoose.Schema.Types.Mixed }, // Date of Packaging
    use_by: { type: mongoose.Schema.Types.Mixed }, // Use by / Expiry Date
    usp: { type: mongoose.Schema.Types.Mixed }, // Unique Selling Proposition
    barcode: { type: mongoose.Schema.Types.Mixed } // Barcode Number
});

const Label = mongoose.model('Label', labelSchema);
export default Label;
