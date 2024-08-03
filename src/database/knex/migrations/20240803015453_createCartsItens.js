/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('carts_itens', table => {
        table.increments('id').primary();
        table.integer('cart_id').references('id').inTable('carts').onDelete('CASCADE');
        table.integer('dish_id').references('id').inTable('dishes');
        table.string('name').notNullable();
        table.integer('quantity').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('carts_itens');
};
