/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
        table.increments('id').primary();
        table.string('status').notNullable();
        table.decimal('total_price', 10, 2).notNullable();
        table.string('payment_method').notNullable();
        table.integer('created_by').references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('orders');
};
