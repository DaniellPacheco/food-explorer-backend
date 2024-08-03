const DishRepository = require("../repositories/DishRepository");
const OrderRepository = require("../repositories/OrderRepository");
const OrderItemRepository = require("../repositories/OrderItemRepository");
const OrderService = require("../services/OrderService");
class OrderController {

    async create(req, res) {

        const { status, total_price, payment_method, dishes } = req.body;

        const user_id = req.user.id;

        const dishRepository = new DishRepository();
        const orderRepository = new OrderRepository();
        const orderItemRepository = new OrderItemRepository();
        const orderService = new OrderService(orderRepository, orderItemRepository, dishRepository);

        const order = await orderService.create(user_id, status, total_price, payment_method, dishes);

        res.status(201).json(order);

    }

    async index(req, res) {

        const orderRepository = new OrderRepository();
        const orderService = new OrderService(orderRepository);

        const orders = await orderService.index();

        res.status(200).json(orders);

    }

    async show(req, res) {

        const { id } = req.params;

        const orderRepository = new OrderRepository();
        const orderService = new OrderService(orderRepository);

        const order = await orderService.show();

        res.status(200).json(order);

    }

    async update(req, res) {

        const { id } = req.params;

        const orderRepository = new OrderRepository();
        const orderService = new OrderService(orderRepository);

    }

    async delete(req, res) {

        const { id } = req.params;

        const orderRepository = new OrderRepository();
        const orderService = new OrderService(orderRepository);

        await orderService.delete(parseInt(id));

        res.status(200).json({ message: "Order deleted successfully" });

    }


}

module.exports = OrderController;