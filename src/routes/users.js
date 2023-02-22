//* Require */
const express = require('express');
const router = express.Router();
let db = require('../database/models');

//* Controllers require */
const userController = require('../controllers/usersController');

//* Middlewares require */
const uploadFile = require('../middlewares/usersMulterMiddleware');
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRegisterMiddleware = require('../middlewares/validateRegisterMiddleware');
const validateLoginMiddleware = require('../middlewares/validateLoginMiddleware');
const validateUserEditForm = require ("../middlewares/validateUserEditForm")

//* Formulario de Login */
router.get('/login', guestMiddleware, userController.login);

//* Procesar el Login */
router.post('/login', validateLoginMiddleware , userController.loginProcess);

//* Formulario de registro */
router.get('/register', guestMiddleware, userController.register);

//* Procesa el registro */
router.post('/register', uploadFile.single('foto') , validateRegisterMiddleware , userController.processRegister);

//* perfil usuario */
router.get("/profile", authMiddleware, userController.profile)

router.get('/edit/:id', authMiddleware, userController.edit);
router.put('/update/:id', uploadFile.single('foto'), validateUserEditForm, userController.update)

router.get("/logout", userController.logout)

module.exports = router
