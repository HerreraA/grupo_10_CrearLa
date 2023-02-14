const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña')
]