const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;

const productsController = {
    delete: async function (req, res) {
        try{
            const Servicio = await Servicios.findByPk(req.params.id)
            res.render('serviciosDelete', {Servicio})
        }
        catch (e) {
            console.log(e)
        }
    },
    destroy: async function (req, res) {
        try {
            const deleted = await Servicios.destroy({where: {id:req.params.id}, force: true})
            res.redirect('/products')
        }
        catch(e) {
            console.log(e)
        }
    }

}

module.exports = productsController ;
