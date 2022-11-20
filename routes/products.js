const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//* Enseña la cantidad de productos disponibles */
router.get('', productsController.index);

//* estas rutas en realizad deberian ser para cuando buscamos por id pero hay que hacer una vista que lo permita//
// osea esta router.get("/detail/:id", heroesCotroller.detail)

router.get('/desarrolloApp', productsController.desarrolloApp);

router.get('/desarrolloSoftware', productsController.desarrolloSoftware);

router.get('/desarrolloWeb', productsController.desarrolloWeb);

router.get('/disenoWeb', productsController.disenoWeb);

router.get('/ecommerce', productsController.ecommerce);
// ***********************************//
router.get("/detail/create", productsController.create) //muestra el form//



module.exports = router;
