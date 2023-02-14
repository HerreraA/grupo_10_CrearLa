// ******** Require's ********* 
const express = require('express');
const router = express.Router();

// ******* Controller require: el que van a utilizar todas las ruta dentro de este archivo ********
const mainController = require('../controllers/mainController')

const {body} = require('express-validator');

const validateUserContactForm = [
    body('nombre')
        .notEmpty().withMessage('Debes ingresar tu nombre y apellido').bail(),
    body('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('tel')
        .notEmpty().withMessage('Debes ingresar un número de teléfono').bail()
        .isNumeric().withMessage('No debes ingresar letras en este campo'),
    body('mensaje')
        .notEmpty().withMessage('Por favor, ingresá la consulta  que tengas, y te responderemos a la brevedad.').bail()
        .isLength({min: 15}).withMessage('Por favor, ingresá al menos 15 caracteres')
];


router.get('/', mainController.home);

/* Vista del formulario de contacto */
router.get('/contact', mainController.contact);

/* Procesa el formulario de contacto */
router.post('/contact', validateUserContactForm , mainController.contactProcess);

router.get('/portafolio', mainController.portfolio);

router.get('/carrito', mainController.carrito);

router.get('/nosotros', mainController.nosotros);

module.exports = router;