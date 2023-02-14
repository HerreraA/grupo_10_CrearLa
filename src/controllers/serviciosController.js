const fs = require('fs');
const path = require('path');
let db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;


// Defino variable para base de datos
let categorias = db.Categoria
let servicios = db.Servicios

const serviciosController = {
    //* Muestra todos los servicios */
    all: (req, res) => {
        let listadoCategorias = categorias.findAll()
        let listadoServicios = servicios.findAll()  
        Promise.all([listadoCategorias,listadoServicios])
        .then(function ([categorias,servicios]) {
            return res.render('./servicios/servicios', {categorias, servicios})
        })
    },
    
    detail: (req, res) => {
        let servicioId = req.params.id;
        let listadoCategorias = categorias.findAll()
        let listadoServicios = servicios.findAll() 
        Promise.all([listadoCategorias,listadoServicios])
            .then(function([categorias,servicios]){
                res.render('./servicios/servicioSolo', { servicioId, categorias, servicios});
            })
    },

    //* Formulario para crear un servicio */    
    servicioCreate: (req, res) => {
        categorias.findAll()
            .then(function (categorias) {
                return res.render('./servicios/servicioCreate', { categorias: categorias })
            })
    },

    //* Guarda un servicio */
    store: (req, res) => {
        const resultValidation = validationResult(req)
         if (resultValidation.errors.length > 0) {
            return res.render('./servicios/servicioCreate', {
               errors: resultValidation.mapped(),
               oldData: req.body,
               categorias
            })
         } else {
        db.Servicios.create({
            nombre: req.body.nombre,
            category_id: req.body.categoria,
            descripcion: req.body.description,
            precio: req.body.precio,
            foto: req.body.foto
        }).then(function(){
            res.redirect('/servicios/all')
        })
    }},

    detailCategory: (req, res) => {
         let categoriaId = categorias.findByPk(req.params.id, {
            include: [{ association: "servicios" }]
        })
        let listadoServicios = servicios.findAll()

        Promise.all([categoriaId, listadoServicios])
            .then(function ([categorias, servicios]) {
                res.render('./servicios/serviciosCategoria', { categorias, servicios })
            })
        
    },


    edit:(req, res) => {
        let listadoCategorias = categorias.findAll( {
            include: [{ association: "servicios" }]
        })
        let listadoServicios = servicios.findByPk(req.params.id)
        Promise.all([listadoCategorias, listadoServicios])
            .then(function ([categorias, servicios]) {
                res.render('./servicios/servicioEdit', { categorias, servicios })
            })
    },


   update: (req, res) => {
        db.Servicios.update({
            nombre: req.body.nombre,
            category_id: req.body.categoria,
            descripcion: req.body.description,
            precio: req.body.precio,
            imagen: req.body.foto
        }, {
            where:{
                id: req.params.id
            }
        }) .then( function(){
            res.redirect('/servicios/detail/' + req.params.id)
        })
    },


    delete: (req, res) => {
        servicios.destroy({
            where : {
                id: req.params.id
            }
        }). then(res.redirect('/servicios/all'))
    }
}

module.exports = serviciosController;
