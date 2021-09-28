

const validarCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const esAdmin = require('./validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...esAdmin
}