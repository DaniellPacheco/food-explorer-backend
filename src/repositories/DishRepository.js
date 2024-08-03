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

        return dish_id;
    }

    async findAll(search) {
        const { dishName, dishDescription } = search;

        const dishes = await knex('dishes')
            .select(
                'dishes.id AS dish_id',
                'dishes.name AS dish_name',
                'dishes.price AS dish_price',
                'dishes.description AS dish_description',
                'dishes.image AS dish_image',
                'dishes_categories.name AS category_name',
                'dishes_ingredients.id AS ingredient_id',
                'dishes_ingredients.name AS ingredient_name'
            )
            .leftJoin('dishes_categories', "dishes.id", "dishes_categories.dish_id")
            .leftJoin('dishes_ingredients', 'dishes.id', 'dishes_ingredients.dish_id')
            .orderBy('dishes.name');

        if (dishName || dishDescription) {
            dishes = dishes.where(builder => {
                if (dishName) {
                    builder.where("dishes.name", "like", `%${dishName}%`);
                }

                if (dishDescription) {
                    builder.orWhere("dishes.description", "like", `%${dishDescription}%`);
                }
            })
        }

        const dishesMap = new Map();

        dishes.forEach(dish => {
            if (!dishesMap.has(dish.dish_id)) {
                dishesMap.set(dish.dish_id, {
                    id: dish.dish_id,
                    name: dish.dish_name,
                    price: dish.dish_price,
                    description: dish.dish_description,
                    image: dish.dish_image,
                    category: dish.category_name,
                    ingredients: []
                });
            }

            const insertIngredientDish = dishesMap.get(dish.dish_id);

            if (dish.ingredient_id) {
                insertIngredientDish.ingredients.push({
                    id: dish.ingredient_id,
                    name: dish.ingredient_name
                });
            }
        });

        const allDishes = Array.from(dishesMap.values());

        return allDishes;
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