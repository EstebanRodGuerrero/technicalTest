const Usuario = require('../models/usuario');
const Tarea = require('../models/tarea');




    // Usuario
    const usuarioExiste = async ( id ) => {
        const existe = await Usuario.findById( id );
        if( !existe ) {
            throw new Error(`El usuario con id: ${ id } no está registrado en la DB.`);
        }
    }


    // Tarea
    const tareaExiste = async ( id ) => {
        const existe = await Tarea.findById( id );
        if( !existe ) {
            throw new Error(`La Tarea con id: ${ id } no está registrada en la DB.`);
        }
    }


    // Email
    const mailExiste = async ( correo = '' ) => {
        const existe = await Usuario.findOne({ correo });
        if( existe ) {
            throw new Error(`El correo con id: ${ correo } ya está registrado en la DB.`);
        }
    }



module.exports = {
    mailExiste,
    usuarioExiste,
    tareaExiste
}
