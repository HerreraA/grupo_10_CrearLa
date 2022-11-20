const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');


// ************ Configuración de multer ************
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/img')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })

// const upload = multer({ storage });
    const uploadFile= require("../middlewares/multerMiddleware")

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
router.post("/detail", uploadFile.single("foto"), productsController.store); //guarda lo que cargan en el form//



module.exports = router;
