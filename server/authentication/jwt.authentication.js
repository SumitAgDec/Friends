const JWT = require('jsonwebtoken');

const secret = "$sumit$123";

const createSignedToken = (payload) => {
    const token = JWT.sign({
        email: payload.email,
        _id: payload._id
    }, secret);

    return token;
}

const verifyToken = async (token) => {
    const user = await JWT.verify(token, secret);
    return user;
}


module.exports = {
    createSignedToken,
    verifyToken
}