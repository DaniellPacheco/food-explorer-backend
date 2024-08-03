const { Router } = require("express");

const ordersRoute = Router();

const OrderController = require("../controllers/OrderController");
const orderController = new OrderController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

ordersRoute.use(ensureAuthenticated);

ordersRoute.get('/', orderController.index);
ordersRoute.post('/', orderController.create);
ordersRoute.get('/:id', orderController.show);
ordersRoute.patch('/:id', orderController.update);
ordersRoute.delete('/:id', orderController.delete);

module.exports = ordersRoute;