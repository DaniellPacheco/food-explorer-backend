const { Router } = require("express");

const dishesRoute = Router();

const DishController = require("../controllers/DishController");
const dishController = new DishController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

dishesRoute.use(ensureAuthenticated);

dishesRoute.get('/', dishController.index);
dishesRoute.post('/', dishController.create);
dishesRoute.get('/:id', dishController.show);
dishesRoute.patch('/:id', dishController.update);
dishesRoute.delete('/:id', dishController.delete);

module.exports = dishesRoute;