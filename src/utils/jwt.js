const jwt = require('jsonwebtoken');
const { configObjet } = require('../config');

const PRIVATE_KEY = configObjet.private_key;

const generateToken = user => jwt.sign(user, PRIVATE_KEY, { expiresIn: "1d" });

const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) return res.status(401).send({ status: error, error: "not autenticated" });
    
    const token = authHeader.split('')[1];
    jwt.verify(token, PRIVATE_KEY, (error, usuarioExtraidDelToken) => {
        req.user = usuarioExtraidDelToken;
        next();
    })
}

module.exports = {
    generateToken,
    authTokenMiddleware,
    PRIVATE_KEY
}