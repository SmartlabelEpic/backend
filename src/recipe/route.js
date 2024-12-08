import express from 'express';
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from './controller.js';

const router = express.Router();

// Create a new recipe
router.post('/recipes', createRecipe);

// Get all recipes
router.get('/', getAllRecipes);

// Get a recipe by ID
router.get('/recipes/:id', getRecipeById);

// Update a recipe
router.put('/recipes/:id', updateRecipe);

// Delete a recipe
router.delete('/recipes/:id', deleteRecipe);

export default router;
