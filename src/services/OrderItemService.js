const AppError = require("../utils/AppError");

class OrderItemService {
    constructor(orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    async create(order_id, dish_id, quantity) {
        if (!order_id) {
            throw new AppError('Order is required', 400);
        }

        if (!dish_id) {
            throw new AppError('Dish is required', 400);
        }

        if (!quantity) {
            throw new AppError('Quantity is required', 400);
        }

        await this.orderItemRepository.create(order_id, dish_id, quantity);
    }

    async index() {
        const orders = await this.orderRepository.findAll();
        return orders;
    }
}

module.exports = OrderItemService;