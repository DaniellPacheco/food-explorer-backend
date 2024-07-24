const { Router } = require('express');

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Express.js API!" });
})

module.exports = router;