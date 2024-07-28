const { Router } = require('express');

const dishesIngredientsRoute = Router();
const DishIngredientController = require("../controllers/DishIngredientController");
const dishIngredientController = new DishIngredientController();
// 
dishesIngredientsRoute.post('/', dishIngredientController.create);

module.exports = dishesIngredientsRoute;
