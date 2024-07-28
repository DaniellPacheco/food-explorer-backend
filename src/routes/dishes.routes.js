const { Router } = require("express");

const dishesRoute = Router();

const DishController = require("../controllers/DishController");
const dishController = new DishController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

dishesRoute.use(ensureAuthenticated);

dishesRoute.get('/', dishController.index);
dishesRoute.post('/', dishController.create);

module.exports = dishesRoute;