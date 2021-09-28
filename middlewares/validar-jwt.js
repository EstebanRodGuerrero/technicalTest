const { request , response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');




    const validarJWT = async ( req = request , res = response , next ) => {


        // Se valida existencia de un token
        const token = req.header('x-token');

        if( !token ) {
            return res.status(401).json({
                msg: 'NO hay un token en la petición.'
            })
        }



        try {
            
            const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY );
            const usuario = await Usuario.findById( uid )
            
            // Lee si el usuario está logeado
                if( !usuario ) {
                    return res.status(401).json({
                        msg: 'Token no válido - el Usuario no existe en la BD'
                    })
                }
                

            req.usuario = usuario;

            next();


        } catch (error) {
            console.log(error)
            res.status(401).json({
                msg: 'Token no válido.'
            })
        }

    }



module.exports = {
    validarJWT
}