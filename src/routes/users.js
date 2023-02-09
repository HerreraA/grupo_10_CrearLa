//* Require */
const express = require('express');
const router = express.Router();
//* Controllers require */

const userController = require('../controllers/usersController');
const uploadFile = require('../middlewares/multerMiddleware');

const validations= require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

//********* VALIDACIONES NUEVO *********/
const {check} = require('express-validator');
const {body} = require('express-validator');
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
const validateLoginForm = [
    body('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
        // Deberá existir en la base //
    body('password')
        .notEmpty().withMessage('Debes ingresar una constraseña').bail()
        // Deberá existir en la base //
];
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


const validateServicioCreateForm = [
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
];
const validateServicioEditForm = [
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
        // Deberá ser un archivo válido (JPG, JPEG, PNG, GIF). //
    body('precio')
        .notEmpty().withMessage('Debes ingresar el precio del servicio')
];




//* Formulario de Login */
router.get('/login', guestMiddleware, userController.login);

//* Procesar el Login */
router.post('/login', validateLoginForm , userController.loginProcess);



//* Formulario de registro */
router.get('/register', guestMiddleware, userController.register);

//* Procesa el registro */
router.post('/register', uploadFile.single('foto') , validateUserCreateForm , userController.processRegister);


//* perfil usuario */
router.get("/profile", authMiddleware, userController.profile)


router.get("/logout", userController.logout)

module.exports = router
