const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

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

        const diskStorage = new DiskStorage();

        if (image) {
            await diskStorage.saveFile(image);
        }

        const [dish] = await this.dishRepository.create({
            name,
            price,
            description,
            image,
            created_by: user_id,
            updated_by: user_id
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

    async index(search) {

        if (search) {
            const dishFiltered = search.split(",").map((dish) => dish.trim()).map((dish) => `%${dish}%`);

            return await this.dishRepository.findAll(dishFiltered);
        }

    }

    async show(id) {
        const dish = await this.dishRepository.findById(id);

        if (!dish) {
            throw new AppError("Dish not found", 404);
        }

        const category = await this.dishCategoryRepository.findByDishId(dish.id);

        if (!category) {
            throw new AppError("Category not found", 404);
        }

        const ingredients = await this.dishIngredientRepository.findByDishId(dish.id);

        const dishWithAllInformation = {
            ...dish,
            category: category.name,
            ingredients: ingredients.map(ingredient => ingredient.name)
        }

        return dishWithAllInformation;
    }

    async update({ user_id, id, name, price, description, image, category, ingredients }) {

        if (!user_id) {
            throw new AppError("User ID is required", 400);
        }

        if (!id) {
            throw new AppError("ID Dish is required", 400);
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

        const dish = await this.dishRepository.findById(id);

        if (!dish) {
            throw new AppError("Dish not found", 404);
        }

        const dishUpdate = {
            name: name ?? dish.name,
            description: description ?? dish.description,
            price: price ?? dish.price,
            updated_by: user_id
        }

        if (image) {
            const diskStorage = new DiskStorage();

            if (dish.image) {
                await diskStorage.deleteFile(dish.image);
            }

            const filename = await diskStorage.saveFile(image);
            dishUpdate.image = filename;

        }

        if (category) {
            await this.dishCategoryRepository.deleteByDishId(id);

            await this.dishCategoryRepository.create({
                name: category,
                dish_id: id,
                user_id: user_id
            });
        }

        return dishUpdate;

    }

    async delete(id) {
        if (!id) {
            throw new AppError("ID is required", 400);
        }

        return await this.dishRepository.delete(id);
    }
}
module.exports = DishService;