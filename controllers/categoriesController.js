const fs = require('fs');
const path = require('path');  
let db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;

// Defino variable para base Json de Categorías
const categoryFilePath = path.join(__dirname, '../data/categories.json');
let categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const categoriesController = {

    //* Enseña la cantidad de categorías disponibles */
    index: (req, res) => {
        categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));
        res.render('./products/categories', {categories})
    },
    /*category: (req, res) => {
        db.Categoria.findByPk(req.params.id)
            .then(servicio => {
                res.render('./products/categories', {products});
            });
    },*/
    categoryCreate: (req, res) => {
        res.render('./products/categoryCreate')
    },
    store: (req, res)=>{
        // guardamos la categoría//
        let newCategory = {
            id: categories[categories.length - 1].id + 1,
			nombre: req.body.nombre,
			descripcion: req.body.description,
			imagen: req.file.filename,
		}
		categories.push(newCategory);
		fs.writeFileSync(categoryFilePath, JSON.stringify(categories, null, "  "));
		res.redirect("/categories")
    }
}

module.exports = categoriesController;