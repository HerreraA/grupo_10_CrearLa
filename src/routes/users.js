//* Require */
const express = require('express');
const router = express.Router();
//* Controllers require */

const userController = require('../controllers/usersController');
const uploadFile = require('../middlewares/multerMiddleware');

const validations= require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const validateUserCreateForm = require ("../middlewares/validateUserCreateForm")
const validateLoginForm = require ("../middlewares/validateLoginForm")
//********* VALIDACIONES NUEVO *********/
const {check} = require('express-validator');
const {body} = require('express-validator');





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
