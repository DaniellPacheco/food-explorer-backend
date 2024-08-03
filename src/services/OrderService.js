const AppError = require("../utils/AppError");

class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async create(status, total_price, payment_method, created_by, dishes) {

        if (!status) {
            throw new AppError('Status is required', 400);
        }

        if (!total_price) {
            throw new AppError('Total price is required', 400);
        }

        if (!payment_method) {
            throw new AppError('Payment method is required', 400);
        }

        if (!created_by) {
            throw new AppError('Created by is required', 400);
        }



    }
}