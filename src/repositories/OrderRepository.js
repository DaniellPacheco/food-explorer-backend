const knex = require('../database/knex');

class OrderRepository {
    async create(status, total_price, payment_method, created_by) {
        const orders = await knex('orders')
            .returning('id')
            .insert({
                status,
                total_price,
                payment_method,
                created_by
            });

        return orders;
    }

    async updateTotalPrice(id, total_price) {
        return await knex('orders').where({ id }).update({ total_price });
    }

    async findById(id) {
        return knex('orders').where({ id }).first();
    }

    async findAll() {
        const orders = await knex('orders')
            .select(
                'orders.id',
                'orders.status',
                'orders.total_price',
                'orders.payment_method',
                'orders_items.id AS order_item_id',
                'orders_items.dish_id AS order_item_dish_id',
                'orders_items.quantity AS order_item_quantity',
                'dishes.id AS dish_id',
                'dishes.name AS dish_name',
                'dishes.price AS dish_price',
                'dishes.description AS dish_description',
                'dishes.image AS dish_image'
            )
            .leftJoin('orders_items', 'orders.id', 'orders_items.order_id')
            .leftJoin('dishes', 'orders_items.dish_id', 'dishes.id')
            .orderBy('orders.id', 'desc');

        const ordersMap = new Map();

        orders.forEach(order => {

            if (!ordersMap.has(order.id)) {
                ordersMap.set(order.id, {
                    id: order.id,
                    status: order.status,
                    total_price: order.total_price,
                    payment_method: order.payment_method,
                    items: []
                });
            }

            const insertItensOrder = ordersMap.get(order.id);

            if (order.order_item_id) {
                insertItensOrder.items.push({
                    dish_id: order.order_item_dish_id,
                    dish_name: order.dish_name,
                    dish_price: order.dish_price,
                    dish_description: order.dish_description,
                    dish_image: order.dish_image,
                    quantity: order.order_item_quantity,
                });
            }
        });

        const allOrders = Array.from(ordersMap.values());

        return allOrders;
    }

    async update(id, status, total_price, payment_method) {
        return await knex('orders').where({ id }).returning('id').update({ status, total_price, payment_method });
    }

    async delete(id) {
        return await knex('orders').where({ id }).del();
    }
}

module.exports = OrderRepository;