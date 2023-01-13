const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;

const productsController = {
  edit: async function(req, res) {
        try{
            const Servicio = await Servicios.findByPk(req.params.id)
            res.render('productEditForm', {Servicio})
        }
        catch (e) {
            console.log(e)
        }
    },
    update: async function (req,res) {
        try {
            const updated = await Servicios.update(
                {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    imagen: req.body.imagen, //debo poner el if por si tenia? BUSCAR!
                    precio: req.body.precio,
                   
                },
                {
                    where: {id:req.params.id}
                }
            )
            res.redirect('/products/detail/' + updated.id)
        }
        catch (e) {
            console.log(e)
        }
    },

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
