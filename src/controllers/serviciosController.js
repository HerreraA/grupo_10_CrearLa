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
let servicios = db.Servicio.findAll()

// Defino variable para base de datos
let categorias = db.Categoria.findAll()

const serviciosController = {
    //* Muestra todos los servicios */
    all: (req, res) => {
        servicios = JSON.parse(fs.readFileSync(serviciosFilePath, 'utf-8'));
        res.render('./servicios/servicios', {servicios, categorias})
    },
    //* Guarda un servicio */
    store: (req, res)=>{
        let newServicio= {
            id: servicios[servicios.length - 1].id + 1,
			nombre: req.body.nombre,
			descripcion: req.body.description,            
            category_id: req.body.categoria,
			imagen: req.file.filename,
            precio: req.body.precio
		}
		servicios.push(newServicio);
		fs.writeFileSync(serviciosFilePath, JSON.stringify(servicios, null, "  "));
		res.redirect('/servicios/detailCategory/' + newServicio.category_id)
    },
    //* Formulario para crear un servicio */    
    servicioCreate: (req, res) => {
        db.Categoria.findAll()
            .then(function(categorias){
                return  res.render('./servicios/servicioCreate', {categorias:categorias})
            })
    },
    detail: (req, res) => {
        let servicioId = req.params.id;
        res.render('./servicios/servicioSolo', {servicioId, servicios, categorias});
    },
    detailCategory: (req, res) => {

        let categoryId = req.params.id;
        res.render('./servicios/serviciosCategoria', {categoryId, servicios, categorias});
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
