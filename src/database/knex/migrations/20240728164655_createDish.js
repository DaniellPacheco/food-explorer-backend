/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('dishes', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.text('description').notNullable();
        table.string('image').defaultTo(null);
        table.integer('created_by').references('id').inTable('users');
        table.integer('updated_by').references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('dishes');
};
