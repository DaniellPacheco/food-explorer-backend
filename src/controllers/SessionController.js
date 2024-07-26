const SessionRepository = require("../repositories/SessionRepository");
const SessionService = require("../services/SessionService");

class SessionController {
    async login(req, res) {

        const { email, password } = req.body;

        const sessionRepository = new SessionRepository();
        const sessionService = new SessionService(sessionRepository);

        const session = await sessionService.login(email, password);

        if (!session) {
            throw new Error("Invalid email or password");
        }

        res.status(200).json({ token: session.token, user: session.user });

    }
}

module.exports = SessionController;