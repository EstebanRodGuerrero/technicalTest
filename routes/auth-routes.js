const { Router } = require('express'); 
const { check } = require('express-validator');

const { login } = require('../controllers/auth-controller');
const { validarCampos } = require('../middlewares');



const router = Router(); 


    router.post( '/' , 
        [
            check('username'),
            check('password' , 'La contraseña es obligatoria').not().isEmpty(),
            validarCampos
        ] ,
           login )



module.exports = router;










