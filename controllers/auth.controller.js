

const {response} = require('express');

const{ check} = require('express-validator');

const User = require('../models/user');

const bcryptjs = require('bcryptjs');

const {generateJWT} = require('../helpers/generate-jwt');

const login = async(req,res = response) =>{

    const { email, password } = req.body

    try {
        //verified if email exist
        const user = await  User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: 'User/ Password are invalid'
            });
        }

        // is user is active
        if(!user.status){
            return res.status(400).json({
                message: `User/ Password are invalid - Status: ${user.status}`
            });
        }
        //if password is valid
        const validPassword = bcryptjs.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                message: `User/ Password are invalid - password`
            });
        }

        //Generate JWT

        const token = await generateJWT(user.id);


        // verificar si el email exist
      /*  const query = {status: true,...email};
        const userActive = User.find(query);
        // si el usuario está activo
        if(!userActive){
            res.status(403).json({
               message: 'User Inactive/ Not exist'
            });
        }*/


        // generar el JWT
        res.json({
            status: 200,
            user,
            token
        });
    }catch (e) {
        return res.status(500).json({
            message : e
        });
    }

}

module.exports = { login };
