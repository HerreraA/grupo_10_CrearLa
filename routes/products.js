const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/products', productsController.index);


module.exports = router;
