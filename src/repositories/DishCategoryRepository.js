const knex = require('../database/knex');

class DishCategoryRepository {

    async create({ name, dish_id, user_id }) {
        return await knex('dishes_categories').insert({
            name,
            dish_id,
            user_id
        });
    }

    async index() {
        return await knex('dishes_categories').select('*');
    }

    async findByDishId(id) {
        return await knex('dishes_categories').where({ dish_id: id }).first();
    }

    async deleteByDishId(id) {
        return await knex('dishes_categories').select('*').where({ id }).del();
    }

}

module.exports = DishCategoryRepository;