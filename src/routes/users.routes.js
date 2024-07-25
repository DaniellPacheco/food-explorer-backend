const { Router } = require('express');

const userRoute = Router();

const UserController = require("../controllers/UserController");

const userController = new UserController();

userRoute.get("/", userController.index);
userRoute.get("/:id", userController.show);
userRoute.post("/", userController.create);
userRoute.put("/:id", userController.update);
userRoute.delete("/:id", userController.delete);

module.exports = userRoute;