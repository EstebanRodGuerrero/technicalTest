const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    username: {
        type: String,
        required: [ true , 'El username es obligatorio' ]
    },
    password: {
        type: String,
        required: [ true , 'La contraseña es obligatoria' ]
    },
    nombre: {
        type: String,
        required: [ true , 'El nombre es obligatorio' ]
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: [ 'ADMIN_ROLE' , 'USER_ROLE' ]
    },
    google: {
        type: Boolean,
        default: false
    },
    correo: {
        type: String,
        required: [ true , 'El correo es obligatorio' ],
        unique: true 
    }
});

// Validacion de seguridad: Esto se utiliza para ocultar o mas bien, no retornar datos delicados al FRONT - Replicar en todos los modelos.
UsuarioSchema.methods.toJSON = function() {
    const { __v , password , ...usuario } = this.toObject();
    return usuario;
}


module.exports = model( 'Usuario' , UsuarioSchema );