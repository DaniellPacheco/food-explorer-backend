const knex = require('../database/knex');

class UserRepository {

    async getAll() {
        return await knex('users');
    }

    async findById(id) {
        return await knex('users').where({ id }).first();
    }

    async findByEmail(email) {
        return await knex("users").where({ email }).first();
    }

    async create({ name, email, hashedPassword, is_admin = 0 }) {
        return await knex('users').insert({ name, email, password: hashedPassword, is_admin });
    }

    async update({ id, name, password, old_password, is_admin }) {
        return await knex('users').where({ id }).update({ name, password, old_password, is_admin })
    }

    async delete(id) {
        return await knex('users').where({ id }).del();
    }

    async validate(id) {
        return await knex('users').where({ id }).first();
    }

}

module.exports = UserRepository;