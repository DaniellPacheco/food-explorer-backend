/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orders_items', function (table) {
        table.increments('id').primary();
        table.integer('order_id').references('id').inTable('orders').onDelete('CASCADE');
        table.integer('dish_id').references('id').inTable('dishes');
        table.string('name').notNullable();
        table.integer('quantity').notNullable();

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('orders_items');
};
