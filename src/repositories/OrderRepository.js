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
        return await knex('orders').select('*');
    }

    async update(id, status, total_price, payment_method) {
        return await knex('orders').where({ id }).update({ status, total_price, payment_method });
    }
}

module.exports = OrderRepository;