//* Require */
const express = require('express');
const router = express.Router();

//* Controllers require */
const userController = require('../controllers/usersController');


const uploadFile = require('../middlewares/multerMiddleware');
const validations= require("../middlewares/validateRegisterMiddleware");

//* Formulario de Login */
router.get('/login', userController.login);

//* Procesar el Login */
router.post('/login', userController.loginProcess);

//* perfil usuario */
router.get("/profile", userController.profile)

//* Formulario de registro */
router.get('/register', userController.register);

//* Procesa el registro */
router.post('/register', uploadFile.single('foto'), validations, userController.processRegister);

module.exports = router
