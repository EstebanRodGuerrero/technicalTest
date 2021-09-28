const mongoose = require('mongoose');



// Conexión a la BD
const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN , { // Url que tenemos en .env

            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true,
            // useFindAndModify: false
            
        });

        console.log('La conexion a la BD exitosa');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}