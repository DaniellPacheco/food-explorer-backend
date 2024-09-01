const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const dishesRoute = Router();

const DishController = require("../controllers/DishController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishController = new DishController();

const upload = multer(uploadConfig.MULTER);

dishesRoute.use(ensureAuthenticated);

dishesRoute.get('/', dishController.index);
dishesRoute.post('/', upload.single("image"), dishController.create);
dishesRoute.get('/:id', dishController.show);
dishesRoute.patch('/:id', dishController.update);
dishesRoute.put('/:id', dishController.updateImage);
dishesRoute.delete('/:id', dishController.delete);

module.exports = dishesRoute;
