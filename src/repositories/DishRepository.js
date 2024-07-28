const knex = require('../database/knex');

class DishRepository {
    async create({ name, price, description, image = null }) {
        const dish_id = knex('dishes')
            .returning('id')
            .insert({
                name,
                price,
                description,
                image
            });

        // console.log(dish_id)
        return dish_id;
    }

    async findAll() {
        return await knex('dishes').select('*');
    }

    async findById(id) {
        return await knex('dishes').where({ id }).first();
    }

    async findByName(name) {
        return await knex('dishes').where({ name }).first();
    }

    async update({ id, name, price, description, image = null }) {
        return await knex('dishes').where({ id }).update({ id, name, price, description, image })
    }

    async delete(id) {
        return await knex('dishes').where({ id }).del();
    }
}

module.exports = DishRepository;