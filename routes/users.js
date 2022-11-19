const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

const userController = require('../controllers/usersController');

router.get('/login', userController.login)

router.get('/register', userController.register)

module.exports = router;