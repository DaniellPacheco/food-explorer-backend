/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string("name");
        table.string("email").unique();
        table.string("password");
        table.boolean("is_admin").default(false);
        table.timestamps("created_at").default(knex.fn.now());
        table.timestamps("updated_at").default(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable('users');
};
