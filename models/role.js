

const {Schema, model} = require('mongoose');


const RoleSchema =  Schema({
    role: {
        type: String,
        require:[true, 'The role is mandatory']
    }

})

module.exports =  model('Role',RoleSchema)
