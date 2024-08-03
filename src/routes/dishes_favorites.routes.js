const { Router } = require("express");

const dishesFavoritesRoute = Router();

const DishFavoritesController = require("../controllers/DishFavoritesController");
const dishFavoritesController = new DishFavoritesController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

dishesFavoritesRoute.use(ensureAuthenticated);

dishesFavoritesRoute.get('/', dishFavoritesController.index);
dishesFavoritesRoute.post('/', dishFavoritesController.create);
dishesFavoritesRoute.delete('/:id', dishFavoritesController.delete);

module.exports = dishesFavoritesRoute;