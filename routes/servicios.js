const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');
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
//router.get('/serviciosList', serviciosController.index);
router.get('/', serviciosController.index);

//* estas rutas en realizad deberian ser para cuando buscamos por id pero hay que hacer una vista que lo permita//
// osea esta router.get("/detail/:id", heroesCotroller.detail)

/*router.get('/desarrolloApp', serviciosController.desarrolloApp);

router.get('/desarrolloSoftware', serviciosController.desarrolloSoftware);

router.get('/desarrolloWeb', serviciosController.desarrolloWeb);

router.get('/disenoWeb', serviciosController.disenoWeb);

router.get('/ecommerce', serviciosController.ecommerce); */


// ***********************************//
router.get('/productCreate', serviciosController.productCreate); //muestra el form que crea servicios//
router.post('/detail', uploadFile.single("foto"), serviciosController.store); //guarda lo que cargan en el form//

// ** muestra detalle de un producto **//
router.get("/detail/:id", serviciosController.detail)
// ** editar un producto **

router.get('/edit/:id', serviciosController.edit);
router.post('/update/:id', serviciosController.update);
// *** ELIMINAR un producti **//
router.get('/delete/:id', serviciosController.delete);
router.post('/delete/:id', serviciosController.destroy);

module.exports = router;
