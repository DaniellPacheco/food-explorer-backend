const AppError = require("../utils/AppError");

class DishService {
    constructor(dishRepository, dishCategoryRepository, dishIngredientRepository) {
        this.dishRepository = dishRepository;
        this.dishCategoryRepository = dishCategoryRepository;
        this.dishIngredientRepository = dishIngredientRepository;
    }

    async create({ user_id, name, price, description, image, category, ingredients }) {

        if (!user_id) {
            throw new AppError("User ID is required", 400);
        }

        if (!name) {
            throw new AppError("Name is required", 400);
        }

        if (!price) {
            throw new AppError("Price is required", 400);
        }

        if (!description) {
            throw new AppError("Description is required", 400);
        }

        if (!category) {
            throw new AppError("Category is required", 400);
        }

        if (!ingredients) {
            throw new AppError("Ingredients are required", 400);
        }

        const dishExists = await this.dishRepository.findByName(name);

        if (dishExists) {
            throw new AppError("Dish already exists", 400);
        }

        const [dish] = await this.dishRepository.create({
            name,
            price,
            description,
            image
        });

        const { id: dish_id } = dish;

        await this.dishCategoryRepository.create({ name: category, dish_id, user_id });

        const ingredientsInsert = ingredients.map(name => {
            return {
                name,
                dish_id,
                user_id
            }
        });

        await this.dishIngredientRepository.create(ingredientsInsert);

        return dish_id;

    }

    async index() {
        return await this.dishRepository.findAll();
    }

    async show(id) {
        return await this.dishRepository.findById(id);
    }

    async update({ id, name, price, description, image, category, ingredients }) {
    }

    async delete(id) {
        if (!id) {
            throw new AppError("ID is required", 400);
        }

        return await this.dishRepository.delete(id);
    }
}
module.exports = DishService;