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

//* Muestra todos los servicios */
router.get('/all', productsController.all);



// Crear un servicio //
router.get('/productCreate', productsController.productCreate); //muestra el form que crea servicios//
router.post('/detail', uploadFile.single("foto"), productsController.store); //guarda lo que cargan en el form//



// ** muestra detalle de un producto **//
router.get("/detail/:id", productsController.detail)

// ** editar un producto **
router.get('/edit/:id', productsController.edit);
router.post('/update/:id', productsController.update);

// *** ELIMINAR un producto **//
router.get('/delete/:id', productsController.delete);
router.post('/delete/:id', productsController.destroy);

module.exports = router;