const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();


//* Formulario de Login */
router.get('/login', userController.login)

//* Formulario de registro */
router.get('/register', userController.register)

//* Procesa el registro */
router.post('/register', userController.processRegister)

module.exports = router
