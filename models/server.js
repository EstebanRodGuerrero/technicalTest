const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');



class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;


        // Paths
        this.authPath          = '/api/auth';
        this.usuariosPath      = '/api/usuarios';
        this.tareasPath        = '/api/tareas';
        


        // Ejecuta ConectarDB
        this.conectarDB();

        // Ejecuta Swaggers
        this.swagger();

        //Ejecuta Middlewares
        this.middlewares();

        // Ejecuta las rutas de mi aplicación
        this.routes();

    }


    // Conectar DB
    async conectarDB() {
        // <--- Aquí podemos crear mas conexiones para, POR EJEMPLO: si estamos en PRODUCCIÓN utilizar una BD y otra si estamos en DESARROLLO.
        await dbConnection();
    }


    // Swagger
    swagger() {

    }

    // Middlewares de express
    middlewares() {

        // CORS: Restringe acceso a la API
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    // Rutas
    routes() {
        this.app.use( this.authPath     , express.json() , require('../routes/auth-routes') );
        this.app.use( this.usuariosPath , express.json() , require('../routes/usuarios-routes') );
        this.app.use( this.tareasPath   , express.json() , require('../routes/tareas-routes') );
    }

    // Escucha puertos
    listen() {
        this.app.listen( this.port , () => {
            console.log(`Servidor corriendo en el puerto: ${ process.env.PORT }`);
        } );
    }

}


module.exports = Server;