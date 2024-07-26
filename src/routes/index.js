const { Router } = require('express');

const router = Router();

const usersRoutes = require("./users.routes");
const sessionRoutes = require("./sessions.routes");

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Express.js API!" });
})
router.use("/users", usersRoutes);
router.use("/session", sessionRoutes);

module.exports = router;