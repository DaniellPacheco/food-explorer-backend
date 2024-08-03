const knex = require('../database/knex');

class CartRepository {

    async create(created_by, status, total_price) {
        const cart = await knex('carts')
            .returning('id')
            .insert({ created_by, status, total_price });

        return cart;
    }

    async findAll() {
        const carts = await knex('carts')
            .select(
                'carts.id',
                'carts.status',
                'carts.total_price',
                'carts_itens.id AS cart_item_id',
                'carts_itens.dish_id AS cart_item_dish_id',
                'carts_itens.quantity AS cart_item_quantity',
                'dishes.id AS dish_id',
                'dishes.name AS dish_name',
                'dishes.price AS dish_price',
                'dishes.description AS dish_description',
                'dishes.image AS dish_image'
            )
            .leftJoin('carts_itens', 'carts.id', 'carts_itens.cart_id')
            .leftJoin('dishes', 'carts_itens.dish_id', 'dishes.id')
            .orderBy('carts.id', 'desc');

        const cartsMap = new Map();

        carts.forEach(cart => {

            if (!cartsMap.has(cart.id)) {
                cartsMap.set(cart.id, {
                    id: cart.id,
                    status: cart.status,
                    total_price: cart.total_price,
                    items: []
                });
            }

            const insertItensCarts = cartsMap.get(cart.id);

            if (cart.cart_item_id) {
                insertItensCarts.items.push({
                    dish_id: cart.cart_item_dish_id,
                    dish_name: cart.dish_name,
                    dish_price: cart.dish_price,
                    dish_description: cart.dish_description,
                    dish_image: cart.dish_image,
                    quantity: cart.cart_item_quantity,
                });
            }
        });

        const allCarts = Array.from(cartsMap.values());

        return allCarts;
    }

    async findById(id) {
        return await knex('carts').where({ id }).first();
    }

    async updateTotalPrice(id, total_price) {
        return await knex('carts').where({ id }).update({ total_price });
    }

    async update(id, status) {
        return await knex('carts').where({ id }).update({ status });
    }

    async delete(id) {
        return await knex('carts').where({ id }).del();
    }

}

module.exports = CartRepository;