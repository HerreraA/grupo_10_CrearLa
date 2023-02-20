const express = require('express');
const router = express.Router();
const apiCarritoController= require('../controllers/apiCarritoController');


router.get('/list', apiCarritoController.list);

module.exports = router;