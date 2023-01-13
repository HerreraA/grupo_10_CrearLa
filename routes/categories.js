const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// const upload = multer({ storage });
const uploadFile= require("../middlewares/multerMiddleware")

//* Enseña la cantidad de categorías disponibles */
router.get('/', categoriesController.index);

// ***********************************//
router.get('/categoryCreate', categoriesController.categoryCreate); //muestra el form que crea categorías//
router.post('/detail', uploadFile.single("foto"), categoriesController.store); //guarda lo que cargan en el form//

module.exports = router;