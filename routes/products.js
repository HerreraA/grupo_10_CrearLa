const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//* Enseña la cantidad de productos disponibles */
router.get('', productsController.index);



router.get('/carrito', productsController.carrito);

router.get('/desarrolloApp', productsController.desarrolloApp);

router.get('/desarrolloSoftware', productsController.desarrolloSoftware);

router.get('/desarrolloWeb', productsController.desarrolloWeb);

router.get('/disenoWeb', productsController.disenoWeb);

router.get('/ecommerce', productsController.ecommerce);


module.exports = router;
