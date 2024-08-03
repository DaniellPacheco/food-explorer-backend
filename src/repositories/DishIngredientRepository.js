const knex = require('../database/knex');

class DishIngredientRepository {
    async create(ingredients) {
        const ingredientsId = await knex('dishes_ingredients')
            .returning('id')
            .insert(ingredients);

        return ingredientsId;
    }

    async findAll() {
        return await knex('dishes_ingredients').select('*');
    }

    async findByDishId(id) {
        return await knex('dishes_ingredients').select("name").where({ dish_id: id });
    }
}

module.exports = DishIngredientRepository;