const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
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

//* Muestra todas las categorías */
router.get('/all', categoriesController.index);


// * Muestra el detalle de una categoría *//
router.get('/detail/:id/', categoriesController.detail);


// Crea una categoría //
router.get('/categoryCreate', categoriesController.categoryCreate); //muestra el form que crea categorías//
router.post('/detail', uploadFile.single("foto"), categoriesController.store); //guarda lo que cargan en el form//


module.exports = router;