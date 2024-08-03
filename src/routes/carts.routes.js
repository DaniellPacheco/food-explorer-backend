const { Router } = require("express");

const cartsRoute = Router();

const CartController = require("../controllers/CartController");
const cartController = new CartController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

cartsRoute.use(ensureAuthenticated);

cartsRoute.get('/', cartController.index);
cartsRoute.post('/', cartController.create);
cartsRoute.get('/:id', cartController.show);
cartsRoute.patch('/:id', cartController.update);
cartsRoute.delete('/:id', cartController.delete);

module.exports = cartsRoute;