const knex = require('../database/knex');

class DishRepository {
    async create({ name, price, description, image = null, created_by }) {
        const dish_id = knex('dishes')
            .returning('id')
            .insert({
                name,
                price,
                description,
                image,
                created_by
            });

        return dish_id;
    }

    async findAll(search) {

        let dishes;

        if (search) {
            const keywords = search.toString().split(" ").map((keyword) => `%${keyword}%`);

            dishes = await knex("dishes")
                .select([
                    "dishes.id",
                    "dishes.name",
                    "dishes.description",
                    "dishes.price",
                    "dishes.image",
                    "dishes_categories.name as category"
                ])
                .leftJoin("dishes_ingredients", "dishes.id", "dishes_ingredients.dish_id")
                .leftJoin("dishes_categories", "dishes.id", "dishes_categories.dish_id")
                .where((builder) => {
                    builder.where((builder2) => {
                        keywords.forEach((keyword) => {
                            builder2.orWhere("dishes.name", "like", keyword);
                            builder2.orWhere("dishes.description", "like", keyword);
                        });
                    });
                    keywords.forEach((keyword) => {
                        builder.orWhere("dishes_ingredients.name", "like", keyword);
                    });
                    keywords.forEach((keyword) => {
                        builder.orWhere("dishes_categories.name", "like", keyword);
                    });
                })
                .groupBy("dishes.id")
                .orderBy("dishes.name");
        } else {
            dishes = await knex("dishes")
                .select([
                    "dishes.id",
                    "dishes.name",
                    "dishes.description",
                    "dishes.price",
                    "dishes.image",
                    "dishes_categories.name as category"
                ])
                .leftJoin("dishes_categories", "dishes.id", "dishes_categories.dish_id")
                .orderBy("dishes.name");
        }

        const dishesIngredients = await knex("dishes_ingredients").select(['id', 'name', 'dish_id']);


        const dishesWithIngredients = dishes.map((dish) => {
            const dishIngredients = dishesIngredients.filter((ingredient) => ingredient.dish_id === dish.id);

            return {
                ...dish,
                ingredients: dishIngredients,
            };
        });
        console.log(dishesWithIngredients)

        return dishesWithIngredients;

        // return dishes;
    }

    async findById(id) {
        return await knex('dishes').where({ id }).first();
    }

    async findByName(name) {
        return await knex('dishes').where({ name }).first();
    }

    async getPrice(id) {
        return await knex('dishes').select('price').where({ id }).first();
    }

    async update({ id, name, price, description, image, update_by }) {
        return await knex('dishes').where({ id }).update(
            {
                name,
                price,
                description,
                image,
                update_by
            }
        )
    }

    async update(id, image) {
        return await knex('dishes').where({ id }).update({ image });
    }

    async delete(id) {
        return await knex('dishes').where({ id }).del();
    }
}

module.exports = DishRepository;