const CartRepository = require("../repositories/CartRepository");
const DishRepository = require("../repositories/DishRepository");
const CartItemRepository = require("../repositories/CartItemRepository");
const CartService = require("../services/CartService")

class CartController {

    async create(req, res) {
        const user_id = req.user.id;

        const { status, total_price, dishes } = req.body;

        const dishRepository = new DishRepository();
        const cartRepository = new CartRepository();
        const cartItemRepository = new CartItemRepository();
        const cartService = new CartService(cartRepository, cartItemRepository, dishRepository);

        const cart = await cartService.create(user_id, status, total_price, dishes);

        res.status(201).json({ message: "Cart created successfully", cart });
    }

    async index(req, res) {

        const cartRepository = new CartRepository();
        const cartService = new CartService(cartRepository);

        const carts = await cartService.index();

        res.status(200).json(carts);
    }

    async show(req, res) {
        const { id } = req.params;

        const cartRepository = new CartRepository();
        const cartService = new CartService(cartRepository);

        const cart = await cartService.show(parseInt(id));

        res.status(200).json(cart);
    }

    async update(req, res) {
        const { id } = req.params;

        const cartRepository = new CartRepository();
        const cartService = new CartService(cartRepository);

        await cartService.update(parseInt(id));

        res.status(200).json({ message: "Cart updated successfully" });
    }

    async delete(req, res) {
        const { id } = req.params;

        const cartRepository = new CartRepository();
        const cartService = new CartService(cartRepository);

        await cartService.delete(parseInt(id));

        res.status(200).json({ message: "Cart deleted successfully" });
    }

}

module.exports = CartController;