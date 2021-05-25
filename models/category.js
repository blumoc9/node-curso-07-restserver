const {Schema, model} = require('mongoose');


const CategorySchema = Schema({
        name: {
            type: String,
            require: [true, 'The name is mandatory'],
            unique: true
        },
        status: {
            type: Boolean,
            default: true,
            require: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        }
    }
)

module.exports =  model('Category',CategorySchema)
