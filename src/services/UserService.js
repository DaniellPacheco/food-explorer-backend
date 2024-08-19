const { hash, compare } = require('bcryptjs');
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

    async update(id, { name, password, oldPassword, is_admin }) {

        if (!name) {
            throw new AppError("Name is required", 400);
        }

        if (!password) {
            throw new AppError("Password is required", 400);
        }

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        user.name = name ?? user.name;

        if (password && !oldPassword) {
            throw new AppError("You need to enter your old password to set a new password.", 400);
        }

        if (password && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password);

            if (!checkOldPassword) {
                throw new AppError("The old password does not match.");
            }

            user.password = await hash(password, 12);
        }

        await this.userRepository.update(user);
    }

    async delete(id) {
        const userDeleted = await this.userRepository.delete(id);

        if (!userDeleted) {
            throw new AppError("User not found", 404);
        }

        return userDeleted;
    }

    async validate(id) {
        if (!id) {
            throw new AppError("ID is required", 400);
        }

        const user = await this.userRepository.validate(id);

        console.log(user);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        return user;
    }

}

module.exports = UserService;