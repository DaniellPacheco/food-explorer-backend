const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers;

    if (!authHeader.cookie) {
        throw new AppError("Token not provided", 401);
    }

    const [, token] = authHeader.cookie.split('token=');

    try {

        const { sub: userId } = verify(token, authConfig.jwt.secret);

        req.user = {
            id: Number(userId)
        };

        return next();

    } catch {
        throw new AppError("Invalid token", 401);
    }

    /// continuando
}

module.exports = ensureAuthenticated;