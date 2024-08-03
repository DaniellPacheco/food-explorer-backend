const AppError = require("../utils/AppError");

class DishFavoritesService {

    constructor(dishFavoritesRepository) {
        this.dishFavoritesRepository = dishFavoritesRepository;
    }

    async create(dish_id, user_id) {

        if (!dish_id) {
            throw new AppError("Dish is required", 400);
        }

        if (!user_id) {
            throw new AppError("User is required", 400);
        }

        const dishFavoriteExists = await this.dishFavoritesRepository.findFavorite(dish_id, user_id);

        if (dishFavoriteExists) {
            throw new AppError("Dish already favorited", 409);
        }

        const dishFavorite = await this.dishFavoritesRepository.create(dish_id, user_id);

        return dishFavorite;
    }

    async index() {
        return await this.dishFavoritesRepository.index();
    }

    async delete(id) {
        return await this.dishFavoritesRepository.delete(id);
    }

}

module.exports = DishFavoritesService;