const validateLoginForm = [
    body('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
        // Deberá existir en la base //
    body('password')
        .notEmpty().withMessage('Debes ingresar una constraseña').bail()
        // Deberá existir en la base //
];

module.exports = validateLoginForm