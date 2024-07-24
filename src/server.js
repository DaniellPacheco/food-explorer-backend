require("express-async-errors");
require("dotenv/config");

const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const uploadConfig = require("./configs/upload");
const ensuresErrorValidation = require("./middlewares/ensuresErrorValidation");
const migrationsRun = require("./database/sqlite");

migrationsRun();

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(ensuresErrorValidation);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));