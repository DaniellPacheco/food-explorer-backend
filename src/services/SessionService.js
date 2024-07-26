const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionService {

    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async login(email, password) {

        if (!email) {
            throw new AppError("Please provide an email address", 400);
        }

        if (!password) {
            throw new AppError("Please provide a password", 400);
        }

        const user = await this.sessionRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign(
            { email: user.email }, // payload
            secret,
            {
                subject: String(user.id),
                expiresIn,
            }
        );

        return { token, user };
    }
}

module.exports = SessionService;