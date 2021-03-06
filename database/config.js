const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log(`Database Online`);
    }catch (e) {
        throw  new Error('Error to start DB');
    }

}

module.exports = {
    dbConnection
};
