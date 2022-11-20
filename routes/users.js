const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');


//* Formulario de Login */
router.get('/login', userController.login)

//* Formulario de registro */
router.get('/register', userController.register)

//* Procesa el registro */
router.post('/register', userController.processRegister)

module.exports = router
