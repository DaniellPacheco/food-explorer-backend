const { Router } = require('express');

const router = Router();

const usersRoutes = require("./users.routes");
const sessionRoutes = require("./sessions.routes");
const dishRoutes = require("./dishes.routes");
const dishesCategoriesRoute = require("./dishes_categories.routes");
const dishesIngredientsRoute = require("./dishes_ingredients.routes");
const dishesFavoritesRoute = require("./dishes_favorites.routes");
const ordersRoute = require("./orders.routes");

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Express.js API!" });
})
router.use("/users", usersRoutes);
router.use("/session", sessionRoutes);
router.use("/dishes", dishRoutes);
router.use("/categories", dishesCategoriesRoute);
router.use("/ingredients", dishesIngredientsRoute);
router.use("/favorites", dishesFavoritesRoute);
router.use("/orders", ordersRoute);

module.exports = router;