const {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
} = require("../controllers/user.controller");
const {Router} = require('express');

const router = Router();


router.get('/', usersGet);
router.post('/', usersPost);
router.put('/:id', usersPut);
router.delete('/', usersDelete);

module.exports = router;

