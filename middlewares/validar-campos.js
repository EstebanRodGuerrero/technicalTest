const { validationResult } = require('express-validator')



    const validarCampos = ( req , res , next ) => { 
        const errors = validationResult( req );

        if( !errors.isEmpty() ){
            console.log(errors);
            res.status(400).json( errors )
        }
        next();
    }



module.exports = {
    validarCampos
}