//* Require */
const express = require('express');
const router = express.Router();
const path = require ('path');

//* Controllers require */
const serviciosController = require('../controllers/serviciosController');

//* Middlewares require */
const validateServicioCreateForm = require ("../middlewares/validateServicioCreateForm");
const validateServicioEditForm = require ("../middlewares/validateServicioEditForm");
const uploadFile = require("../middlewares/servicesMulterMiddleware");


//* Muestra todos los servicios */
router.get('/all', serviciosController.all);


// * Muestra el detalle de un servicio *//
router.get("/detail/:id", serviciosController.detail)


// * Muestra servicios por categoria *//
router.get("/detailCategory/:id", serviciosController.detailCategory)


// Crea un servicio //
router.get('/servicioCreate', serviciosController.servicioCreate); //muestra el form que crea servicios//
router.post('/detail', uploadFile.single("foto"), validateServicioCreateForm , serviciosController.store); //guarda lo que cargan en el form//


// Edita un servicio //
router.get('/edit/:id', serviciosController.edit);
router.put('/update/:id', uploadFile.single("foto") , validateServicioEditForm , serviciosController.update);


// Elimina un servicio //
router.post('/delete/:id', serviciosController.delete);

module.exports = router;