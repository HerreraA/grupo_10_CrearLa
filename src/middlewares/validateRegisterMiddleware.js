

const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('domicilio').notEmpty().withMessage('Tienes que escribir un domicilio'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('usuario').notEmpty().withMessage('Tienes que escribir un usuario'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('confirmar-pass').notEmpty().withMessage('Tienes que escribir nuevamente la contraseña')
    /*body('foto').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error ('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)) {
                throw new Error ('Las extensiones permitidas son ${acceptedExtensions.join(', ')}');
            }
        }
        return true;
    })*/
]