const {request,response} = require('express')

const usersGet = (req = request, res = response) => {
    const params = req.query;
    res.json({
        status: 200,
        description: "Get API OK userGet - Controller",
        params
    });
};

const usersPost = (req = request, res = response) => {

    const user = req.body;
    res.json({
        status: 200,
        description: "Get API OK usersPost - Controller",
        user
    });
};

const usersPut = (req = request, res = response) => {

    const id = req.params.id;
    res.json({
        status: 200,
        description: "Get API OK usersPut - Controller",
        id: id
    });
};

const usersDelete = (req= request, res= response) => {
    res.json({
        status: 200,
        description: "Get API OK usersDelete - Controller"
    });
};

module.exports = {
    usersGet, usersPost, usersPut, usersDelete
}
