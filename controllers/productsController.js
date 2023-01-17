const fs = require('fs');
const path = require('path');  
let db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Defino variable para base Json de Categorías
const categoryFilePath = path.join(__dirname, '../data/categories.json');
let categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));


const productsController = {
    //* Muestra todos los productos */
    all: (req, res) => {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('./products/product', {products})
    },
    store: (req, res)=>{
        // guardamos el producto//
        let newProduct= {
            id: products[products.length - 1].id + 1,
			nombre: req.body.nombre,
			descripcion: req.body.description,            
            categoria: req.body.categoria,
			imagen: req.file.filename,
            precio: req.body.precio
		}
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, "  "));
		res.redirect("/categories")
    },
    productCreate: (req, res) => {
        res.render('./products/productCreate', {categories})
    },
    detail: (req, res) => {
        let categoryId = req.params.id;
        res.render('./products/product', {categoryId, products});
    },
    edit: async function(req, res) {
        try{
            const Servicio = await Servicio.findByPk(req.params.id)
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
