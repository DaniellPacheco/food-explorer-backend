const { Router } = require('express');

const userRoute = Router();

const UserController = require("../controllers/UserController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userController = new UserController();

userRoute.use(ensureAuthenticated);

userRoute.get("/", userController.index);
userRoute.get("/validated", userController.validate);
userRoute.get("/:id", userController.show);
userRoute.post("/", userController.create);
userRoute.put("/:id", userController.update);
userRoute.delete("/:id", userController.delete);



module.exports = userRoute;