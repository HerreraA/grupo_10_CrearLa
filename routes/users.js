const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');
const productsController = require('../controllers/productsController');
const uploadFile = require('../middlewares/multerMiddleware');
const {route} = require('./main');


router.get('/login', userController.login)


router.get('/register', userController.register)

router.post()
module.exports = router;