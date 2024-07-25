const { hash } = require('bcryptjs');
const AppError = require("../utils/AppError");

class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async index() {
        return await this.userRepository.getAll();
    }

    async show(id) {
        return await this.userRepository.findById(id);
    }

    async create({ name, email, password, is_admin }) {

        if (!name) {
            throw new AppError("Name is required", 400);
        }

        if (!email) {
            throw new AppError("Email is required", 400);
        }

        if (!password) {
            throw new AppError("Password is required", 400);
        }

        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) {
            throw new AppError("Email already exists", 400)
        }

        const hashedPassword = await hash(password, 12);

        return await this.userRepository.create({ name, email, hashedPassword, is_admin });
    }

    async update({ id, name, email, password, oldPassword, is_admin }) {

    }

    async delete(id) {
        const userDeleted = await this.userRepository.delete(id);

        if (!userDeleted) {
            throw new AppError("User not found", 404);
        }

        return userDeleted;
    }


}

module.exports = UserService;