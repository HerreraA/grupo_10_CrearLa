const validateUserCreateForm = [
    body('nombre')
        .notEmpty().withMessage('Debes ingresar tu nombre y apellido').bail()
        .isLength({ min: 2 }).withMessage('Debes ingresar tu nombre completo'),
    body('fechaDeNacimiento')
        .notEmpty().withMessage('Debes ingresar tu fecha de nacimiento'),
    body('domicilio')
        .notEmpty().withMessage('Debes ingresar tu domicilio'),
    body('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido')
        .exists().withMessage('Este email ya se encuentra registrado'),
    body('password')
        .notEmpty().withMessage('Debes ingresar un password').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener, al menos, 8 caracteres'),
        /* Deberá tener letras mayúsculas, minúsculas, un número y un carácter especial
        ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$^&*()_-]).{8,18}$
        */
    //body('foto')
      //  .notEmpty().withMessage('Debes ingresar una imagen').bail()
        // Deberá ser un archivo válido (JPG, JPEG, PNG, GIF). //
];

module.exports = validateUserCreateForm