const { body } = require('express-validator')
const path = require('path')

module.exports=[
    body('nombre')
    .notEmpty().withMessage('Debes ingresar el nombre del servicio').bail()
    .isLength({ min: 5 }).withMessage('El nombre del servicio debe tener, al menos, 5 caracteres'),
body('categoria')
    .notEmpty().withMessage('Debes seleccionar la categoría del servicio'),
body('description')
    .notEmpty().withMessage('Debes ingresar la descripcion del servicio').bail()
    .isLength({ min: 20 }).withMessage('La descripción del servicio debe tener, al menos, 20 caracteres'),
body('foto')
    .notEmpty().withMessage('Debes ingresar una imagen para el servicio'),
body('precio')
    .notEmpty().withMessage('Debes ingresar el precio del servicio')
]