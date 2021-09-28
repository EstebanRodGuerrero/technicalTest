const { Router } = require('express'); 
const { check } = require('express-validator');

const { postTarea, deleteTarea, putTarea } = require('../controllers/tareas-controller')
const { esAdmin , validarJWT , validarCampos } = require('../middlewares');
const { tareaExiste } = require('../helpers/db-validators');


const router = Router(); 


    router.post( '/' , postTarea );


    router.put( '/:id' , 
        [
            validarJWT,
            esAdmin,
            check('id').custom( tareaExiste ),
            check('estado' , 'No es un estado válido').isIn([ 'RESUELTO', 'NO_RESUELTO' ]),
            validarCampos
        ] , 
            putTarea );


    router.delete( '/:id' ,
        [
            validarJWT,
            esAdmin,
            check('id').custom( tareaExiste ),
            validarCampos
        ] ,
            deleteTarea );




module.exports = router;













// ESTO VA!! : check('rol' , 'No es un rol válido').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),