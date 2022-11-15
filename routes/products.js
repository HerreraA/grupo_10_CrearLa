const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products', productsController.index);


//*** GET ALL PRODUCTS *** 
router.get('/', productsController.index); 

//*** CREATE ONE PRODUCT *** 
router.get('/create', productsController.create); 
router.post('/', productsController.store); 


//*** GET ONE PRODUCT *** 
router.get(':id', productsController.detail); 

//*** EDIT ONE PRODUCT *** 
router.get(':id/edit', productsController.edit); 
router.put(':id', productsController.update); 


//*** DELETE ONE PRODUCT*** 
router.delete(':id', productsController.destroy); 



module.exports = router;
