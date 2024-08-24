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
// dishesRoute.post('/', upload.single("image"), (req, res) => {
//     console.log(req.file.filename);
//     res.json();
// });
dishesRoute.get('/:id', dishController.show);
dishesRoute.patch('/:id', dishController.update);
dishesRoute.delete('/:id', dishController.delete);

module.exports = dishesRoute;
