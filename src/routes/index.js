const { Router } = require('express');

const router = Router();

const usersRoutes = require("./users.routes");

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Express.js API!" });
})
router.use("/users", usersRoutes);

module.exports = router;