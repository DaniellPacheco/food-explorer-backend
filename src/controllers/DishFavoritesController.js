const DishFavoritesRepository = require("../repositories/DishFavoritesRepository");
const DishFavoritesService = require("../services/DishFavoritesService");

class DishFavoritesController {

    async create(req, res) {
        const { dish_id } = req.body;
        const user_id = req.user.id;

        const dishFavoritesRepository = new DishFavoritesRepository();
        const dishFavoritesService = new DishFavoritesService(dishFavoritesRepository);

        await dishFavoritesService.create(dish_id, user_id);

        return res.status(201).json({ message: "Dish favorite created successfully" });
    }

    async index(req, res) {
        const dishFavoritesRepository = new DishFavoritesRepository();
        const dishFavoritesService = new DishFavoritesService(dishFavoritesRepository);

        const dishFavorites = await dishFavoritesService.index();

        return res.status(200).json(dishFavorites);
    }

    async delete(req, res) {
        const { id } = req.params;

        const dishFavoritesRepository = new DishFavoritesRepository();
        const dishFavoritesService = new DishFavoritesService(dishFavoritesRepository);

        await dishFavoritesService.delete(parseInt(id));

        return res.status(200).json({ message: "Dish favorite deleted successfully" });
    }

}

module.exports = DishFavoritesController;