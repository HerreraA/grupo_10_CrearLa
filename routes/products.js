const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('', productsController.index);

router.get('/desarrolloApp', productsController.desarrolloApp);

router.get('/desarrolloSoftware', productsController.desarrolloSoftware);

router.get('/desarrolloWeb', productsController.desarrolloWeb);

router.get('/disenoWeb', productsController.disenoWeb);

router.get('/ecommercer', productsController.ecommerce);


module.exports = router;
