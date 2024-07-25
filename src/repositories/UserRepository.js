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

    async update({ id, name, email, password, is_admin }) {

    }

    async delete(id) {
        const user = await knex('users').where({ id }).del();
        console.log(user);
    }

}

module.exports = UserRepository;