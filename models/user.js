const {Schema, model} = require('mongoose');


const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'Name Required']
    },
    email:{
        type: String,
        required: [true, 'Name Required'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Password Required'],
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
});

// In this case we need can't send the password and version,
UserSchema.methods.toJSON = function () {
    const { __v, password, ...users} = this.toObject();
    return users;
}

//  that needs name of Collection and Schema
module.exports = model('User',UserSchema);
