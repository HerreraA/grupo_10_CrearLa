const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer')

// ************ Configuración de multer ************
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products')
    },
    filename: (req, file, cb) => {
        const newFileName = 'product_img_' + Date.now() + file.originalname
        cb(null, newFileName)
    }
})
const upload = multer({ storage })
    const uploadFile= require('../middlewares/multerMiddleware')

//* Enseña la cantidad de productos disponibles */
router.get('/', productsController.index);

// ***********************************//
router.get("/detail/create", productsController.create) //muestra el form//
router.post("/detail", uploadFile.single("foto"), productsController.store); //guarda lo que cargan en el form//

// ** muestra detalle de un producto **//
router.get("/detail/:id", productsController.detail)
// ** editar un producto **

router.get('/products/edit/:id', productsController.edit);
router.post('/products/update/:id', productsController.update);
// *** ELIMINAR un producti **//
router.get('/products/delete/:id', productsController.delete);
router.post('/products/delete/:id', productsController.destroy);

module.exports = router;
