const AppError = require("../utils/AppError");

class DishIngredientService {
    constructor(dishIngredientRepository) {
        this.dishIngredientRepository = dishIngredientRepository;
    }

    async create({ name, dish_id, user_id }) {

        if (!name) {
            throw new AppError("Ingredient name is required", 400);
        }

        if (!dish_id) {
            throw new AppError("Dish ID is required", 400);
        }

        if (!user_id) {
            throw new AppError("User ID is required", 400);
        }

        const dishIngredient = await this.dishIngredientRepository.create([{ name, dish_id, user_id }]);

        return dishIngredient;

    }
}