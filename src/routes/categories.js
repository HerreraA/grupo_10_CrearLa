const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const multer = require('multer')
const path = require('path')
// ************ Configuración de multer ************
/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})*/

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, path.join('./public/images/categorias'))
    },

    filename: (req, file, cb) => {
        const newFilename = 'categ' + Date.now() + path.extname(file.originalname)
        cb(null, newFilename)
    }
})  


const upload = multer({ storage });

//const uploadFile = require("../middlewares/multerMiddleware")

//* Muestra todas las categorías */
router.get('/all', categoriesController.index);


// * Muestra el detalle de una categoría *//
router.get('/detail/:id/', categoriesController.detail);


// Crea una categoría //
router.get('/categoryCreate', categoriesController.categoryCreate); //muestra el form que crea categorías//
router.post('/detail', upload.single("foto"), categoriesController.store); //guarda lo que cargan en el form//

// Edita una categoria //
router.get('/edit/:id', categoriesController.edit)
router.put('/edit/:id', categoriesController.toUpdate)

// Borrar una categoria //
router.post('/delete/:id', categoriesController.delete)

module.exports = router;