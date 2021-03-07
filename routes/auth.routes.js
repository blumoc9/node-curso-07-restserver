const {login} = require("../controllers/auth.controller");
const {check} = require("express-validator");

const {isValidRole,isValidEmail,existUserById} = require("../helpers/db-validators");
const {validateFields} = require("../middlewares/validateFields");

const {Router} = require('express');

const router = Router();


const middlewaresAuth = [];

middlewaresAuth.push(check('email', 'email not valid').isEmail());
middlewaresAuth.push(check('password', 'password is required').not().isEmpty());
middlewaresAuth.push(validateFields);

// Path  , Middlewares, Controller
router.post('/login',middlewaresAuth,login);





module.exports = router;
