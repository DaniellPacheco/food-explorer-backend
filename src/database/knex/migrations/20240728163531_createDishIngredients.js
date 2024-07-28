/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('dishes_ingredients', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE');
        table.integer('user_id').references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('dishes_ingredients');
};
