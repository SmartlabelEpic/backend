import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  servingSize: {
    type: String,
    required: true
  },
  netQuantity: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  energy: {
    type: Number,
    required: true // in kJ or kcal
  },
  carbs: {
    type: Number,
    required: true // in grams
  },
  fats: {
    type: Number,
    required: true // in grams
  },
  protein: {
    type: Number,
    required: true // in grams
  },
  sodium: {
    type: Number,
    default: 0 // in milligrams
  },
  iron: {
    type: Number,
    default: 0 // in milligrams
  },
  calcium: {
    type: Number,
    default: 0 // in milligrams
  },
  sugar: {
    type: Number,
    default: 0 // in grams
  },
  fiber: {
    type: Number,
    default: 0 // in grams
  },
  transFat: {
    type: Number,
    default: 0 // in grams
  },
  cholesterol: {
    type: Number,
    default: 0 // in milligrams
  },
  potassium: {
    type: Number,
    default: 0 // in milligrams
  },
  magnesium: {
    type: Number,
    default: 0 // in milligrams
  },
  vitaminA: {
    type: Number,
    default: 0 // in micrograms
  },
  vitaminC: {
    type: Number,
    default: 0 // in milligrams
  },
  vitaminD: {
    type: Number,
    default: 0 // in micrograms
  },
  vitaminE: {
    type: Number,
    default: 0 // in milligrams
  },
  vitaminK: {
    type: Number,
    default: 0 // in micrograms
  },
  folate: {
    type: Number,
    default: 0 // in micrograms
  },
  zinc: {
    type: Number,
    default: 0 // in milligrams
  },
  phosphorus: {
    type: Number,
    default: 0 // in milligrams
  },
  selenium: {
    type: Number,
    default: 0 // in micrograms
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
