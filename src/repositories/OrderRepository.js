const knex = require('../database/knex');

class OrderRepository {
    async create(status, total_price, payment_method, created_by) {
        const orders = await knex('orders').insert({
            status,
            total_price,
            payment_method,
            created_by
        });

        return orders;
    }
}

module.exports = OrderRepository;