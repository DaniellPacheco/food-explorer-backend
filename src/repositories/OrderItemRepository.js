const knex = require('../database/knex');

class OrderItemRepository {

    async create(order_id, dish_id, quantity) {
        return await knex('orders_items').insert({
            order_id,
            dish_id,
            quantity
        });
    }

    async findByOrderId(order_id) {
        return await knex('orders_items').where({ order_id }).select('id', 'dish_id', 'quantity');
    }

    async findDishesOrder(order_id) {
        return await knex('orders_items').where({ order_id }).join('dishes', 'orders_items.dish_id', 'dishes.id').select('dishes.id', 'dishes.name', 'dishes.price', 'orders_items.quantity');
    }

}

module.exports = OrderItemRepository;