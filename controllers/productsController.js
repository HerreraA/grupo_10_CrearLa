const fs = require('fs');
const path = require('path');  
let db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;
const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const Products = db.Product;


const productsController = {

    //* Enseña la cantidad de productos disponibles */
    index: (req, res) => {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('./products/product', {products})
    }, 
   
    productCreate: (req, res) => {
        res.render('./products/productCreate')
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {
                res.render('product-noborrar.ejs', {product});
            });
    },
  edit: async function(req, res) {
        try{
            const Product = await Products.findByPk(req.params.id)
            res.render('productEditForm', {Product})
        }
        catch (e) {
            console.log(e)
        }
    },
    update: async function (req,res) {
        try {
            const updated = await Products.update(
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
            res.redirect('/products/detail/' + updated.id)
        }
        catch (e) {
            console.log(e)
        }
    },

    delete: async function (req, res) {
        try{
            const Product = await Products.findByPk(req.params.id)
            res.render('productsDelete', {Product})
        }
        catch (e) {
            console.log(e)
        }
    },

    destroy: async function (req, res) {
        try {
            const deleted = await Products.destroy({where: {id:req.params.id}, force: true})
            res.redirect('/products')
        }
        catch(e) {
            console.log(e)
        }
    }

}

module.exports = productsController ;
