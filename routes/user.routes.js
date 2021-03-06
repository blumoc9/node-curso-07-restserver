const {check} = require("express-validator");

const {isValidRole,isValidEmail,existUserById} = require("../helpers/db-validators");
const {validateFields} = require("../middlewares/validateFields");

const {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
} = require("../controllers/user.controller");
const {Router} = require('express');

const router = Router();

const middlewares = [];
const middlewaresPut = [];
const middlewaresDelete = [];

middlewares.push(check('name', 'Name is required').not().isEmpty());
middlewares.push(check('email', 'email not valid').isEmail());
middlewares.push(check('email').custom(isValidEmail));
middlewares.push(check('password', 'password mandatory, size mayor 6 characters').isLength({ min:6 }));
//check if exist role in BD
middlewares.push(check('role').custom(isValidRole));
middlewares.push(validateFields);

//Put middleware
middlewaresPut.push(check('id').isMongoId());
middlewaresPut.push(check('id').custom(existUserById))
middlewaresPut.push(check('role').custom(isValidRole));
middlewaresPut.push(validateFields);

//Delete Middlewares

middlewaresDelete.push(check('id').isMongoId());
middlewaresDelete.push(check('id').custom(existUserById))
middlewaresDelete.push(validateFields);




router.get('/', usersGet);
router.post('/',middlewares ,usersPost);
router.put('/:id',middlewaresPut, usersPut);
router.delete('/:id',middlewaresDelete, usersDelete);

module.exports = router;

