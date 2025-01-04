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

// const verifyToken = (token) => {
//     return new Promise((resolve, reject) => {
//         JWT.verify(token, secret, (err, decoded) => {
//             if (err) {
//                 return reject(err); 
//             }
//             resolve(decoded); 
//         });
//     });
// };

module.exports = {
    createSignedToken,
    verifyToken
}