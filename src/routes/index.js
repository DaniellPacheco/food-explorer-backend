const { Router } = require('express');

const router = Router();

const usersRoutes = require("./users.routes");
const sessionRoutes = require("./sessions.routes");
const dishRoutes = require("./dishes.routes");
const dishesCategoriesRoute = require("./dishes_categories.routes");
const dishesIngredientsRoute = require("./dishes_ingredients.routes");

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Express.js API!" });
})
router.use("/users", usersRoutes);
router.use("/session", sessionRoutes);
router.use("/dishes", dishRoutes);
router.use("/categories", dishesCategoriesRoute);
router.use("/ingredients", dishesIngredientsRoute);

module.exports = router;