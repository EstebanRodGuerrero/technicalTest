const { Schema , model } = require('mongoose');


const TareaSchema = Schema({
    nombre: {
        type: String,
        required: [ true , 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: String,
        default: 'NO_RESUETO',
        emun: [ 'RESUELTO' , 'NO_RESUETO' ]
    },
    descripcion: { 
        type: String,
        required: true 
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    fechaModify: {
        type: Date,
        default: Date.now
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model( 'Tarea' , TareaSchema );