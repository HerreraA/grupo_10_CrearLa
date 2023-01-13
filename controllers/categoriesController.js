const fs = require('fs');
const path = require('path');  

// Defino variable para base Json de Categorías
const categoryFilePath = path.join(__dirname, '../data/categories.json');
let categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));

const categoriesController = {

    //* Enseña la cantidad de categorías disponibles */
    index: (req, res) => {
        categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));
        res.render('./products/categories', {categories})
    }, 
    desarrolloApp: (req, res) => {
        res.render ('./products/desarrollo-app')
    },
    desarrolloSoftware: (req, res) => {
        res.render('./products/desarrollo-software')
    },
    desarrolloWeb: (req, res) => {
        res.render('./products/desarrollo-web')
    },
    disenoWeb: (req, res) => {
        res.render('./products/diseno-web')
    },
    ecommerce: (req, res) => {
        res.render('./products/ecommerce')
    },
    categoryCreate: (req, res) => {
        res.render('./products/categoryCreate')
    },
    store: (req, res)=>{
        // guardamos el producto//
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

module.exports = categoriesController ;
