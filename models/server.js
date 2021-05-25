const express = require('express')
const cors = require('cors');

const {dbConnection} = require("../database/config");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            category:   '/api/category',
            user:       '/api/users'
        }

        // Connect to database
        this.connectDB();

        // Middlewares
        this.middlewares();
        // rutas de mi app
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }
    //
    middlewares() {

        //CORS https://www.npmjs.com/package/cors
        this.app.use(cors());
        // read and parse body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.paths.auth,require('../routes/auth.routes'))
        this.app.use(this.paths.category, require('../routes/category'));
        this.app.use(this.paths.user, require('../routes/user.routes'))
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto: ${this.port}`);
        });
    }


}

module.exports = Server;
