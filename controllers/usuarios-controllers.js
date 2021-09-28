const { request , response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const Tarea = require('../models/tarea');



    // Get 1 Usuario
    const getUsuario = async ( req = request , res = response ) => {

        const { id }  = req.params;
        const usuario = await Usuario.findById( id );
        const tareas  = await Tarea.find({ usuario: id });

        res.json({
            usuario,
            tareas
        })
    }


    // Crear Usuario
    const postUsuario = async ( req , res ) => {

        // Extraccion de datos
        const { username , nombre , password , correo , rol } = req.body;
        const usuario = new Usuario( { username , nombre , password , correo , rol } ); // Se crea un modelo de Usuario con estos datos.

        // Encripta contraseña
        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync( password , salt );

        // Guardar modelo en BD
        await usuario.save();

        res.json({
            msg: 'postUsuario funcionando',
            usuario
        });
    } 




module.exports = {
    getUsuario,
    postUsuario
}