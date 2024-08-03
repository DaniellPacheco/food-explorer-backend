const knex = require('../database/knex');

class DishFavoritesRepository {

    async create(dish_id, user_id) {
        return await knex('dishes_favorites').insert({ dish_id, user_id });
    }

    async index() {
        return await knex('dishes_favorites').select('*');
    }

    async delete(id) {
        return await knex('dishes_favorites').where({ id }).del();
    }

    async findFavorite(dish_id, user_id) {
        return await knex('dishes_favorites').where({ dish_id, user_id }).first();
    }

}

module.exports = DishFavoritesRepository;