const knex = require('../database/knex');

class DishCategoryRepository {

    async create({ name, dish_id, user_id }) {
        return await knex('dishes_categories').insert({
            name,
            dish_id,
            user_id
        });
    }

    async getAll() {
        return await knex('dishes_categories').select('*');
    }

}

module.exports = DishCategoryRepository;