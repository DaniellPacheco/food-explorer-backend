const AppError = require("../utils/AppError");
const DishCategoryRepository = require("../repositories/DishCategoryRepository");
const DishCategoryService = require("../services/DishCategoryService");

class DishCategoryController {

    async create(req, res) {

        const { name, dish_id, user_id } = req.body;

        const dishCategoryRepository = new DishCategoryRepository();
        const dishCategoryService = new DishCategoryService(dishCategoryRepository);

        const dishCategory = dishCategoryService.create({ name, dish_id, user_id });

        res.status(201).json({
            message: "Dish Category created successfully",
            dish_category: dishCategory,
        });
    }

    async index(req, res) {

        const dishCategoryRepository = new DishCategoryRepository();
        const dishCategoryService = new DishCategoryService(dishCategoryRepository);

        const dishesCategories = dishCategoryService.index();

        if (!dishesCategories) {
            throw new AppError("No dish categories found", 404);
        }

        res.status(200).json(dishesCategories);
    }
}

module.exports = DishCategoryController;