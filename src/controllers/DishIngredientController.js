const DishIngredientRepository = require("../repositories/DishIngredientRepository");
const DishIngredientService = require("../services/DishIngredientService");

class DishIngredientController {

    async create(req, res) {
        const { name, dish_id } = req.body;

        const user_id = req.user.id;

        const dishIngredientRepository = new DishIngredientRepository();
        const dishIngredientService = new DishIngredientService(dishIngredientRepository);

        await dishIngredientService.create({ name, dish_id, user_id });

        res.status(201).json({
            message: "Dish ingredient created successfully"
        });
    }


}

module.exports = DishIngredientController;