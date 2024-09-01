const DishIngredientRepository = require("../repositories/DishIngredientRepository");
const DishCategoryRepository = require('../repositories/DishCategoryRepository');
const DishRepository = require('../repositories/DishRepository');
const DishService = require('../services/DishService');

class DishController {

    async create(req, res) {
        const { name, price, description, category, ingredients } = req.body;

        const user_id = req.user.id;
        const image = req.file ? req.file.filename : "";
        // const image = req.file.filename;

        const dishIngredientRepository = new DishIngredientRepository();
        const dishCategoryRepository = new DishCategoryRepository();
        const dishRepository = new DishRepository();
        const dishService = new DishService(
            dishRepository,
            dishCategoryRepository,
            dishIngredientRepository
        );

        const dish = await dishService.create({
            user_id,
            name,
            price,
            description,
            image,
            category,
            ingredients: JSON.parse(ingredients)
        });

        res.status(201).json({
            message: "Dish created successfully",
            dish: dish,
        });
    }

    async index(req, res) {

        const { search } = req.query;

        const dishRepository = new DishRepository();
        const dishService = new DishService(dishRepository);

        const dishes = await dishService.index(search);

        res.status(200).json(dishes);
    }

    async show(req, res) {
        const { id } = req.params;

        const dishIngredientRepository = new DishIngredientRepository();
        const dishCategoryRepository = new DishCategoryRepository();
        const dishRepository = new DishRepository();
        const dishService = new DishService(
            dishRepository,
            dishCategoryRepository,
            dishIngredientRepository
        );

        const dish = await dishService.show(parseInt(id));

        if (!dish) {
            throw new AppError('Dish not found', 404);
        }

        res.status(200).json(dish);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, price, description, category, ingredients } = req.body;

        console.log(id);

        const user_id = req.user.id;
        const image = req.file ? req.file.filename : null;

        const dishIngredientRepository = new DishIngredientRepository();
        const dishCategoryRepository = new DishCategoryRepository();
        const dishRepository = new DishRepository();
        const dishService = new DishService(
            dishRepository,
            dishCategoryRepository,
            dishIngredientRepository
        );

        const dish = await dishService.update({
            user_id: parseInt(user_id),
            id: parseInt(id),
            name,
            price,
            description,
            image,
            category,
            ingredients: ingredients
        });

        res.status(200).json({
            message: "Dish updated successfully",
            dish: dish,
        })
    }

    async updateImage(req, res) {
        const { id } = req.params;
        const image = req.file ? req.file.filename : null;

        console.log(id, image);

        const dishIngredientRepository = new DishIngredientRepository();
        const dishCategoryRepository = new DishCategoryRepository();
        const dishRepository = new DishRepository();
        const dishService = new DishService(
            dishRepository,
            dishCategoryRepository,
            dishIngredientRepository
        );

        await this.dishService.updateImage(id, image);

        return res.status(200).json({
            message: "Dish image updated successfully"
        })

    }

    async delete(req, res) {
        const { id } = req.params;

        const dishRepository = new DishRepository();
        const dishService = new DishService(dishRepository);

        dishService.delete(parseInt(id));

        res.status(200).json({ message: "Dish deleted successfully" });
    }

}

module.exports = DishController;