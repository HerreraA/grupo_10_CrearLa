const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

const path = require('path');
const multer = require('multer');

//* Configuracion de MULTER */
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, '/views/images/avatars' ) // error con la carga de archivos
    },
    filename: (req, file, cb) =>{
        let fileName = file.fieldname + ' ' + Date.now();  
        cb(null, fileName )
    }
})

const uploadFile = multer({storage})

const userController = require('../controllers/usersController');


//* Formulario de Login */
router.get('/login', userController.login)

//* Formulario de registro */
router.get('/register', userController.register)

//* Procesa el registro */
router.post('/register', uploadFile.single('foto'), userController.processRegister)

module.exports = router
