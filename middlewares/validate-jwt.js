const jwt = require('jsonwebtoken');

const {request, response} = require('express');

const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    console.log(`token ${token}`);
    if(!token){
        return res.status(401).json({
            message: 'You need a token | 401'
        });
    }

    try {
            // Verify Token
            const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY);

            //leer el usuario que corresponde al uid y almacenar en req.user
            const userAuth = await User.findById(uid);

            if(!userAuth){
                return res.status(401).json({
                    message: 'Invalid Token - User not valid'
                });
            }

            if(!userAuth.status){
                return res.status(401).json({
                    message: 'Invalid Token - State'
                });
            }
            req.userAuth = userAuth;

            next();
    }catch (e) {
        console.error(e);
        return res.status(401).json({
            message: 'Invalid token'
        });
    }


};


module.exports = {
    validateJWT
}
