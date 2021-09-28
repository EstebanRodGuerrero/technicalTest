const { Router } = require('express'); // Extraimos una funcion de express llamada Router
const { check } = require('express-validator');

const { validarCampos , validarJWT , esAdmin } = require('../middlewares');
const { usuarioExiste , mailExiste } = require('../helpers/db-validators');
const { getUsuario , postUsuario } = require('../controllers/usuarios-controllers');





const router = Router(); 



// Leer
    router.get( '/:id' , 
        [
            // ---- Validaciones -----
            validarJWT,
            esAdmin,
            check('id' , 'No es un ID valido por mongo').isMongoId(),
            check('id').custom( usuarioExiste ),
            validarCampos
        ] ,
             getUsuario );


// Crear user
    router.post( '/' , 
        [
            // ---- Validaciones -----
            check('nombre'),
            check('password' , 'Password de minimo 6 caracteres').isLength({ min: 6}),
            check('correo' , 'El correo no es válido').isEmail(),
            check('correo').custom( mailExiste ),
            validarCampos
        ] , 
            postUsuario );





module.exports = router;