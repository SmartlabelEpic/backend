// controllers/foodNameController.js
import FoodName from './models.js'

export const getFoodNames = async (req, res) => {
    const userId = req.user.id;
    try {
      const foodNames = await FoodName.find({ user: userId }).sort({ createdAt: -1 }); // Sort by createdAt in descending order
      res.status(200).json(foodNames);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const createFoodName = async (req, res) => {
    const userId = req.user.id;
    const { name } = req.body;

    try {
        const foodName = new FoodName({ name, user: userId });
        await foodName.save();
        res.status(201).json(foodName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFoodName = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const foodName = await FoodName.findOneAndDelete({ _id: id, user: userId });
        if (!foodName) {
            return res.status(404).json({ message: 'Food name not found' });
        }
        res.status(200).json({ message: 'Food name deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
