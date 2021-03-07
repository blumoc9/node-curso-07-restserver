const {request,response} = require('express')
const bcrytjs = require('bcryptjs');

const User = require('../models/user');


const usersGet = async (req = request, res = response) => {
    const { limit = 5, from = 0} = req.query;
    const query =  { status: true};
    //destructurated array
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(from)).limit(Number(limit))
    ]);

    res.json({
        status: 200,
        total,
        users,
    });
};

const usersPost = async (req = request, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    try {
        // Encrypt password
        const salt = bcrytjs.genSaltSync(); //generate salt, salt default value is 10
        user.password = bcrytjs.hashSync(password, salt);
        // save in database
        await user.save();
    } catch (e) {
        console.error(`Error Save user : ${e}`)
    }

    res.json({
        user
    });
};

const usersPut = async (req = request, res = response) => {

    const {id} = req.params;
    const {_id,__v, password, google,email, ...datatoupdate} = req.body;
    //: TODO validar contra BD

    if (password) {
        // Encrypt password
        const salt = bcrytjs.genSaltSync(); //generate salt, salt default value is 10
        datatoupdate.password = bcrytjs.hashSync(password, salt);

    }

    let data = '';
    try{
        // save in database
        data = await User.findByIdAndUpdate(id, datatoupdate);
    }catch (e) {
        return res.status(400).json({
            description: `Cant update information from ${id}`
        })
    }
    res.status(200).json(data);
};

const usersDelete = async (req = request, res = response) => {

    const {id} = req.params;

    const uid = req.uid;

    // delete in bd only example

    const user = await User.findByIdAndUpdate(id, {status: false});
    // obtener el usuario autenticado
    const authenticatedUser=req.userAuth;

    if (!user) {
        return res.status(400).json({
            message: `Can't Delete this user Id ${id}`
        });
    }

    res.status(200).json({user, authenticatedUser});
};

module.exports = {
    usersGet, usersPost, usersPut, usersDelete
}
