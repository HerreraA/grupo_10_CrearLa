const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('', mainController.home);

router.get('/contact', mainController.contact);

router.get('/portafolio', mainController.portfolio);

router.get('/carrito', mainController.carrito);

router.get('/nosotros', mainController.nosotros);

module.exports = router;