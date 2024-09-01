const AppError = require("../utils/AppError");

class OrderService {
    constructor(orderRepository, orderItemRepository, dishRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.dishRepository = dishRepository;
    }

    async create(user_id, status, total_price, payment_method, dishes) {

        if (!status) {
            throw new AppError('Status is required', 400);
        }

        if (!total_price) {
            throw new AppError('Total price is required', 400);
        }

        if (!payment_method) {
            throw new AppError('Payment method is required', 400);
        }

        if (!user_id) {
            throw new AppError('Created by is required', 400);
        }

        const [order] = await this.orderRepository.create(
            status,
            total_price,
            payment_method,
            user_id
        );

        if (!order) {
            throw new AppError('Order could not be created', 500);
        }

        if (dishes) {
            let totalPrice = 0;

            for (const dish of dishes) {
                await this.orderItemRepository.create(order.id, dish.id, dish.quantity);

                let dishPrice = await this.dishRepository.getPrice(dish.id);

                if (!dishPrice) {
                    throw new AppError(`Dish not found: ${dish.id}`, 404);
                }

                totalPrice += dishPrice.price * dish.quantity;
            }

            if (totalPrice > 0) {
                await this.orderRepository.updateTotalPrice(order.id, totalPrice);
            }
        }

        const newOrder = await this.orderRepository.findById(order.id);

        if (!newOrder) {
            throw new AppError('Order not found', 404);
        }

        const newOrderDishes = await this.orderItemRepository.findByOrderId(order.id);

        if (!newOrderDishes) {
            throw new AppError('Order items not found', 404);
        }

        const newOrderWithDishes = {
            ...newOrder,
            dishes: newOrderDishes
        }

        return newOrderWithDishes;

    }

    async index() {
        const orders = await this.orderRepository.findAll();
        return orders;
    }

    async show(id) {
        const order = await this.orderRepository.findById(id);

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        const dishes = await this.orderItemRepository.findDishesOrder(id);

        if (!dishes) {
            throw new AppError('Dishes not found', 404);
        }

        const orderWithDishes = {
            ...order,
            dishes: dishes
        }

        return orderWithDishes;
    }

    async update(id, status, total_price, payment_method, dishes) {
        if (!status) {
            throw new AppError('Status is required', 400);
        }

        if (!total_price) {
            throw new AppError('Total price is required', 400);
        }

        if (!payment_method) {
            throw new AppError('Payment method is required', 400);
        }

        const [order] = await this.orderRepository.update(
            id,
            status,
            total_price,
            payment_method,
        );

        const updatedOrder = await this.orderRepository.findById(order.id);

        return updatedOrder;

    }

    async delete(id) {
        return await this.orderRepository.delete(id);
    }

    async countDishesOrder(id) {

    }
}

module.exports = OrderService;