const { Router } = require('express');

const dishesCategoriesRoute = Router();
const DishCategoryController = require("../controllers/DishCategoryController");
const dishCategoryController = new DishCategoryController();

dishesCategoriesRoute.get('/', dishCategoryController.index);
dishesCategoriesRoute.post('/', dishCategoryController.create);

module.exports = dishesCategoriesRoute;
