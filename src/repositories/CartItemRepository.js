const knex = require('../database/knex');

class CartItemRepository {
    async create(cart_id, dish_id, quantity) {
        return await knex('carts_itens')
            .returning('id')
            .insert({ cart_id, dish_id, quantity });
    }

    async findByCartId(id) {
        return await knex('carts_itens').where({ cart_id: id }).select('id', 'dish_id', 'quantity');
    }

    async findDishesCart(cart_id) {
        return await knex('carts_itens').where({ order_id }).join('dishes', 'carts_itens.dish_id', 'dishes.id').select('dishes.id', 'dishes.name', 'dishes.price', 'carts_itens.quantity');
    }
}

module.exports = CartItemRepository;