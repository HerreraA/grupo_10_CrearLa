const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer')

// ************ Configuración de multer ************
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './public/img')
},
   filename: function (req, file, cb) {
         cb(null, Date.now() + '-' + file.originalname)
    }
 })

const upload = multer({ storage });
const uploadFile= require("../middlewares/multerMiddleware")

//* Enseña la cantidad de productos disponibles */
//router.get('/productsList', productsController.index);
router.get('/', productsController.index);

//* estas rutas en realizad deberian ser para cuando buscamos por id pero hay que hacer una vista que lo permita//
// osea esta router.get("/detail/:id", heroesCotroller.detail)

router.get('/desarrolloApp', productsController.desarrolloApp);

router.get('/desarrolloSoftware', productsController.desarrolloSoftware);

router.get('/desarrolloWeb', productsController.desarrolloWeb);

router.get('/disenoWeb', productsController.disenoWeb);

router.get('/ecommerce', productsController.ecommerce);


// ***********************************//
router.get('/products/productCreate', productsController.productCreate); //muestra el form que crea servicios//
router.post('/products/detail', uploadFile.single("foto"), productsController.store); //guarda lo que cargan en el form//

// ** muestra detalle de un producto **//
router.get("/products/detail/:id", productsController.detail)
// ** editar un producto **

router.get('/products/edit/:id', productsController.edit);
router.post('/products/update/:id', productsController.update);
// *** ELIMINAR un producti **//
router.get('/products/delete/:id', productsController.delete);
router.post('/products/delete/:id', productsController.destroy);

module.exports = router;
