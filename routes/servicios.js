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

//* Muestra todos los servicios */
router.get('/all', serviciosController.all);



// Crear un servicio //
router.get('/servicioCreate', serviciosController.servicioCreate); //muestra el form que crea servicios//
router.post('/detail', uploadFile.single("foto"), serviciosController.store); //guarda lo que cargan en el form//



// ** muestra detalle de un servicioo **//
router.get("/detail/:id", serviciosController.detail)

// ** editar un servicioo **
router.get('/edit/:id', serviciosController.edit);
router.post('/update/:id', serviciosController.update);

// *** ELIMINAR un servicioo **//
router.get('/delete/:id', serviciosController.delete);
router.post('/delete/:id', serviciosController.destroy);

module.exports = router;