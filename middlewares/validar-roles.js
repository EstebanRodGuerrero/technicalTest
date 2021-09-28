const { response , request } = require('express');



    const esAdmin = ( req = request , res = response , next ) => {

        // Validar que este middleware siempre vaya despues del validarJWT.
            if ( !req.usuario ) {
                return res.status(401).json({
                    msg: 'Se quiere verificar el rol antes de validar el token'
                });
            }

        const { rol , nombre } = req.usuario;

        // Validacion rol ADMIN
            if ( rol !== 'ADMIN_ROLE' ) {
                return res.status(401).json({
                    msg: `El usuario ${ nombre } no es ADMINISTRADOR - No puedes hacer esto.`
                });
            }

        next();

    }


module.exports = {
    esAdmin
}