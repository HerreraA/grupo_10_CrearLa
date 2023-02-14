const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('nombre')
        .notEmpty().withMessage('Debes ingresar tu nombre y apellido').bail()
        .isLength({ min: 2 }).withMessage('Debes ingresar tu nombre completo'),
    body('fechaDeNacimiento')
        .notEmpty().withMessage('Debes ingresar tu fecha de nacimiento'),
    body('domicilio')
        .notEmpty().withMessage('Debes ingresar tu domicilio'),
    body('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('password')
        .notEmpty().withMessage('Debes ingresar un password').bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage('La contraseña debe tener, al menos, 8 caracteres, 1 mayúscula, 1 minúscula y 1 caracter especial'),
    body('confirmarPass')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Debes ingresar la misma contraseña en ambos campos')
            }
            return true; 
        }),
    body('foto')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png','.gif', '.bmp', '.tiff'];

            if (!file) {
                throw new Error ('Tienes que subir una imagen');
            }
            else {
                let fileExtension = path.extname(file.originalname);                
                if(!acceptedExtensions.includes(fileExtension)) {
                    throw new Error (`Las extensiones de archivos permitidas son (${acceptedExtensions.join(', ')})`);
                }
            }
            return true;
    })
]