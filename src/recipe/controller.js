import Recipe from './model.js';

// Create a new recipe
export const createRecipe = async (req, res) => {
  try {
    const {
      name,
      recipes,
      servingSize,
      netQuantity,
      calories,
      energy,
      carbs,
      fats,
      protein,
      sodium,
      iron,
      calcium,
      sugar,
      fiber,
      transFat,
      cholesterol,
      potassium,
      magnesium,
      vitaminA,
      vitaminC,
      vitaminD,
      vitaminE,
      vitaminK,
      folate,
      zinc,
      phosphorus,
      selenium
    } = req.body;

    const newRecipe = new Recipe({
      name,
      recipes,
      servingSize,
      netQuantity,
      calories,
      energy,
      carbs,
      fats,
      protein,
      sodium,
      iron,
      calcium,
      sugar,
      fiber,
      transFat,
      cholesterol,
      potassium,
      magnesium,
      vitaminA,
      vitaminC,
      vitaminD,
      vitaminE,
      vitaminK,
      folate,
      zinc,
      phosphorus,
      selenium
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Error creating recipe', error });
  }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('recipes');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
};

// Get a recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate('recipes');
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error });
  }
};

// Update a recipe
export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      recipes,
      servingSize,
      netQuantity,
      calories,
      energy,
      carbs,
      fats,
      protein,
      sodium,
      iron,
      calcium,
      sugar,
      fiber,
      transFat,
      cholesterol,
      potassium,
      magnesium,
      vitaminA,
      vitaminC,
      vitaminD,
      vitaminE,
      vitaminK,
      folate,
      zinc,
      phosphorus,
      selenium
    } = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        name,
        recipes,
        servingSize,
        netQuantity,
        calories,
        energy,
        carbs,
        fats,
        protein,
        sodium,
        iron,
        calcium,
        sugar,
        fiber,
        transFat,
        cholesterol,
        potassium,
        magnesium,
        vitaminA,
        vitaminC,
        vitaminD,
        vitaminE,
        vitaminK,
        folate,
        zinc,
        phosphorus,
        selenium
      },
      { new: true }
    );

    if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error });
  }
};

// Delete a recipe
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error });
  }
};
