
const validateJWT= require("../middlewares/validate-jwt");
const validateRole = require('../middlewares/validate-roles')
const validateField= require("../middlewares/validateFields");


module.exports = {
    ...validateJWT,
    ...validateRole,
    ...validateField
}
