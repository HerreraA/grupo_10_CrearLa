//* Require */
const express = require('express');
const router = express.Router();

//* Controllers require */
const userController = require('../controllers/usersController');
const uploadFile = require('../middlewares/multerMiddleware');

const validations= require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");



//* Formulario de Login */
router.get('/login', guestMiddleware, userController.login);


//* Formulario de registro */
router.get('/register', guestMiddleware, userController.register);

//* Procesa el registro */
router.post('/register', uploadFile.single('foto'), validations, userController.processRegister);

//* Procesar el Login */
router.post('/login', userController.loginProcess);

//* perfil usuario */
router.get("/profile", authMiddleware, userController.profile)

router.get("/logout", userController.logout)
module.exports = router
