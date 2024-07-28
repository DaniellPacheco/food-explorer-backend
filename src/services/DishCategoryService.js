class DishCategoryService {
    constructor(dishCategoryRepository) {
        this.dishCategoryRepository = dishCategoryRepository;
    }

    async create({ name, dish_id, user_id }) {
        if (!name) {
            throw new Error("Name is required");
        }

        if (!dish_id) {
            throw new Error("Dish ID is required");
        }

        if (!user_id) {
            throw new Error("User ID is required");
        }

        const dishesCategoires = await this.dishCategoryRepository.create({ name, dish_id, user_id });

        return dishesCategoires;

    }

    async index() {
        const dishesCategoires = await this.dishCategoryRepository.getAll();
        return dishesCategoires;
    }
}

module.exports = DishCategoryService;