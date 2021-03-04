const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middlewares
        this.middlewares();
        // rutas de mi app
        this.routes();
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
        this.app.use(this.usersPath, require('../routes/user.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto: ${this.port}`);
        });
    }


}

module.exports = Server;
