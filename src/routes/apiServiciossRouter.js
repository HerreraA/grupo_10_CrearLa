const express = require('express')
const router = express.Router()
const apiServiciosController = require('../controllers/apiServiciosController')

router.get('/', apiServiciosController.all)
router.get('/:id', apiServiciosController.detail)

module.exports = router;