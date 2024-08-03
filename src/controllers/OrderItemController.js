const OrderItemRepository = require("../repositories/OrderItemRepository");
const OrderItemService = require("../services/OrderItemService");

class OrderItemController {

    async create(req, res) {

        const { order_id, dish_id, quantity } = req.body;

        const orderItemRepository = new OrderItemRepository();
        const orderItemService = new OrderItemService(orderItemRepository);

        await orderItemService.create(order_id, dish_id, quantity);

        res.status(201).json({ message: 'Order item created successfully' });

    }

}

module.exports = OrderItemController;