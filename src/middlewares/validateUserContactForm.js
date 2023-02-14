const validateUserContactForm = [
    body('nombre')
        .notEmpty().withMessage('Debes ingresar tu nombre y apellido'),
    body('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('tel')
        .notEmpty().withMessage('Debes ingresar un número de teléfono'),
    body('asunto')
        .notEmpty().withMessage('Por favor, ingresá la consulta  que tengas, y te responderemos a la brevedad.')
];

module.exports = validateUserContactForm