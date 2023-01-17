const fs = require('fs');
const path = require('path');  
let db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;
const serviciosFilePath = path.join(__dirname, '../data/servicios.json');
let servicios = JSON.parse(fs.readFileSync(serviciosFilePath, 'utf-8'));
const Servicios = db.Servicio;


const serviciosController = {

    //* Enseña la cantidad de productos disponibles */
    index: (req, res) => {
        servicios = JSON.parse(fs.readFileSync(serviciosFilePath, 'utf-8'));
        res.render('./servicios/servicio', {servicios})
    }, 
   
    servicioCreate: (req, res) => {
        res.render('./servicios/servicioCreate')
    },
    detail: (req, res) => {
        db.Servicio.findByPk(req.params.id)
            .then(servicio => {
                res.render('servicio-noborrar.ejs', {servicio});
            });
    },
  edit: async function(req, res) {
        try{
            const Servicio = await Servicios.findByPk(req.params.id)
            res.render('servicioEditForm', {Servicio})
        }
        catch (e) {
            console.log(e)
        }
    },
    update: async function (req,res) {
        try {
            const updated = await Servicio.update(
                {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    //imagen: req.body.imagen, //debo poner el if por si tenia? BUSCAR!
                    precio: req.body.precio,
                   
                },
                {
                    where: {id:req.params.id}
                }
            )
            res.redirect('/servicios/detail/' + updated.id)
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
            res.redirect('/servicios')
        }
        catch(e) {
            console.log(e)
        }
    }

}

module.exports = serviciosController ;
