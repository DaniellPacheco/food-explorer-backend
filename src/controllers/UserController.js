const UserRepository = require("../repositories/UserRepository");
const UserService = require("../services/UserService");


class UsersController {

    async index(req, res) {
        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        const users = await userService.index();

        res.status(200).json(users);
    }

    async show(req, res) {
        const { id } = req.params;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        const user = await userService.show(parseInt(id));
        res.status(200).json(user);
    }

    async create(req, res) {

        const { name, email, password, is_admin } = req.body;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        await userService.create({ name, email, password, is_admin });

        res.status(201).json({ message: "User created successfully" });

    }

    async update(req, res) {
        const { id } = req.params;

        const { name, password, oldPassword, is_admin } = req.body;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        await userService.update(parseInt(id), { name, password, oldPassword, is_admin });

        res.status(200).json({ message: "User updated successfully" });
    }

    async delete(req, res) {

        const { id } = req.params;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        await userService.delete(parseInt(id));

        res.status(200).json({ message: "User deleted successfully" });
    }

    async validate(req, res) {
        const { user } = req;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        const validatedUser = await userService.validate(parseInt(user.id));

        res.status(200).json({ validatedUser });
    }

}

module.exports = UsersController;