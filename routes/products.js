const express = require('express');
const router = express.Router();

router.get('', productsController.index);

router.get('/desarrolloApp', productsController.desarrolloApp);

router.get('/desarrolloSoftware', productsController.desarrolloSoftware);

router.get('/desarrolloWeb', productsController.desarrolloWeb);

router.get('/disenoWeb', productsController.disenoWeb);

router.get('/ecommerce', productsController.ecommerce);


module.exports = router;
