const { verifyToken } = require("../authentication/jwt.authentication");

const restrictToLoggedInUserOnlt = (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    verifyToken(token)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            return res.status(401).json({ message: "Unauthorized" });
        });
}

module.exports = {
    restrictToLoggedInUserOnlt
}