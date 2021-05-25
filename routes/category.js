const {check} = require("express-validator");
const { response, Router } = require('express');

const {validateFields,validateJWT,validateRole} = require("../middlewares");
const {createCategory} = require('../controllers/category.controller')



const router = Router();


const middlewareCategory = [];
const middlewaresGet = [];
const middlewaresPut = [];
const middlewaresPost = [];
const middlewaresDelete = [];


//
middlewaresPost.push(validateJWT);
middlewaresPost.push(check('name', 'the name is mandatory').not().isEmpty());
middlewaresPost.push(validateFields);



middlewareCategory.push(check('email', 'email not valid').isEmail());
middlewareCategory.push(check('password', 'password is required').not().isEmpty());
middlewareCategory.push(validateFields);

// Path  , Middlewares, Controller

router.get('/', ((req, res = response) => {
    res.status(200).json({
        message: 'OK'
    });
}));

// obtener una categoria por id- publico
router.get('/:id', ((req, res = response) => {
    res.status(200).json({
        message: `OK - id: ${req.body.params.id}`
    });
}));

// crear una categoria- privado+ - cualquier persona con un token valido
router.post('/',middlewaresPost, createCategory);


// actualizar una categoria por id- privado, con token valido
router.put('/:id', ((req, res = response) => {
    res.status(200).json({
        message: `OK - id: ${req.body.params.id}`
    });
}));


// eliminar una categoria por id- privado, con token valido y su role sea admin
router.delete('/:id', ((req, res = response) => {
    res.status(200).json({
        message: `delete category - id: ${req.body.params.id}`
    });
}));





module.exports = router;
