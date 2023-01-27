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
let categorias = db.Categoria.findAll()
let servicios = db.Servicios.findAll()

const serviciosController = {
    //* Muestra todos los servicios */
    all: (req, res) => {
        servicios
            .then(function(servicios){
                return res.render('./servicios/servicios', {categorias, servicios})
            })
    },
    

    //* Formulario para crear un servicio */    
    servicioCreate: (req, res) => {
        categorias
            .then(function(categorias){
                return  res.render('./servicios/servicioCreate', {categorias:categorias})
            })
    },


    //* Guarda un servicio */
    store: (req, res)=>{
        db.Servicios.create({
            nombre: req.body.nombre,
            category_id: req.body.categoria,
            descripcion: req.body.description,
            precio: req.body.precio,
            imagen: req.body.foto
        })

        res.redirect('/servicios/all')

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


    detail: (req, res) => {
        let servicioId = req.params.id;
        res.render('./servicios/servicioSolo', {servicioId, servicios, categorias});
    },


    detailCategory: (req, res) => {
        db.Categoria.findByPk(req.params.id, {
            include:[{association: "servicios"}]
        })
            .then(function(categorias){
                res.render ('./servicios/serviciosCategoria', {categorias})
            })
        //let categoryId = req.params.id;
        //res.render('./servicios/serviciosCategoria', {categoryId, servicios, categorias});
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
