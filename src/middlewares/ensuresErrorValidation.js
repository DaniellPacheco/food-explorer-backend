const AppError = require("../utils/AppError");
function ensuresErrorValidation(error, response, next) {

    if (error instanceof AppError) {
        console.log(response.status)
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
}

module.exports = ensuresErrorValidation;