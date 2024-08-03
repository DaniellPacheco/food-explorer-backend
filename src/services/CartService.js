const AppError = require("../utils/AppError");

class CartService {

    constructor(cartRepository, cartItemRepository, dishRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.dishRepository = dishRepository;
    }

    async create(user_id, status, total_price, dishes) {

        if (!user_id) {
            throw new AppError("User ID is required", 400);
        }

        if (!status) {
            throw new AppError("Status is required", 400);
        }

        if (!total_price) {
            throw new AppError("Total price is required", 400);
        }

        const [cart] = await this.cartRepository.create(user_id, status, total_price);

        if (!cart) {
            throw new AppError("Cart could not be created", 500);
        }

        if (dishes) {
            let totalPrice = 0;

            for (const dish of dishes) {
                const [item] = await this.cartItemRepository.create(cart.id, dish.id, dish.quantity);

                if (!item) {
                    throw new AppError("Dish could not be added to cart", 500);
                }

                let dishPrice = await this.dishRepository.getPrice(dish.id);

                if (!dishPrice) {
                    throw new AppError(`Dish not found: ${dish.id}`, 404);
                }

                totalPrice += dishPrice.price * dish.quantity;
            }

            if (totalPrice > 0) {
                await this.cartRepository.updateTotalPrice(cart.id, totalPrice);
            }
        }

        const newCart = await this.cartRepository.findById(cart.id);


        if (!newCart) {
            throw new AppError('Cart not found', 404);
        }

        const newCartDishes = await this.cartItemRepository.findByCartId(cart.id);

        if (!newCartDishes) {
            throw new AppError('Cart items not found', 404);
        }

        const newCartWithDishes = {
            ...newCart,
            dishes: newCartDishes
        }

        return newCartWithDishes;
    }

    async index() {
        return await this.cartRepository.findAll();
    }

    async show(id) {
        if (!id) {
            throw new AppError("ID is required", 400);
        }

        return await this.cartRepository.findById(id);
    }

    async update(id) {
        if (!id) {
            throw new AppError("ID is required", 400);
        }

        await this.cartRepository.update(id);
    }

    async delete(id) {
        if (!id) {
            throw new AppError("ID is required", 400);
        }

        return await this.cartRepository.delete(id);
    }

}

module.exports = CartService;