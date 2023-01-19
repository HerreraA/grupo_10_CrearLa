//* Require */
const express = require('express');
const router = express.Router();

//* Controllers require */
const userController = require('../controllers/usersController');


const uploadFile = require('../middlewares/multerMiddleware');

//* Formulario de Login */
router.get('/login', userController.login);

//* Procesar el Login */
router.post('/login', userController.login);

//* Formulario de registro */
router.get('/register', userController.register);

//* Procesa el registro */
router.post('/register', uploadFile.single('foto') , userController.processRegister);

module.exports = router
