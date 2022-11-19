

// ************ Require's ************
const express = require("express");
const router = express.Router();
//********** controller Require ************/
const productsController = require('../controllers/productsController');


const uploadFile= require("../middlewares/multerMiddleware")
router.get('/', productsController.index);

//***** CREAR UN PRODUCTO */
router.get("/detail/create", productsController.create) //muestra el form//
router.post("/detail", uploadFile.single("imgFile"), productsController.store);


module.exports = router;
