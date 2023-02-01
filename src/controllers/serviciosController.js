const fs = require('fs');
const path = require('path');
let db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;

//const serviciosFilePath = path.join(__dirname, '../data/servicios.json');
//let servicios = JSON.parse(fs.readFileSync(serviciosFilePath, 'utf-8'));

// Defino variable para base Json de Categorías
//const categoryFilePath = path.join(__dirname, '../data/categories.json');
//let categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));

//defino variable para servicios
//let servicios = db.Servicios.findAll()

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
        db.Servicios.create({
            nombre: req.body.nombre,
            category_id: req.body.categoria,
            descripcion: req.body.description,
            precio: req.body.precio,
            imagen: req.body.foto
        }).then(res.redirect('/servicios/all'))

        /*let newServicio= {
            id: servicios[servicios.length - 1].id + 1,
            nombre: req.body.nombre,
            descripcion: req.body.description,            
            category_id: req.body.categoria,
            imagen: req.file.filename,
            precio: req.body.precio
        }
        servicios.push(newServicio);
        fs.writeFileSync(serviciosFilePath, JSON.stringify(servicios, null, "  "));
        res.redirect('/servicios/detailCategory/' + newServicio.category_id)*/
    },


    detailCategory: (req, res) => {
         let categoriaId = categorias.findByPk(req.params.id, {
            include: [{ association: "servicios" }]
        })
        let listadoServicios = servicios.findAll()

        Promise.all([categoriaId, listadoServicios])
            .then(function ([categorias, servicios]) {
                res.render('./servicios/serviciosCategoria', { categorias, servicios, categoriaId })
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
