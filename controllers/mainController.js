const fs = require('fs');
const path = require('path');  

// Defino variable para base Json de Categorías
const categoryFilePath = path.join(__dirname, '../data/categories.json');
let categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));

const mainController = {
    home: (req, res) => {
        res.render('./home/home', {categories})
    },
    contact: (req, res) => {
        res.render ('./contact/contact', {categories})
    },
    portfolio: (req, res) => {
        res.render ('./portfolio/portfolio', {categories})
    },
    carrito: (req, res) => {
        res.render('./carrito/carrito', {categories})
    },
    nosotros: (req, res) => {
        res.render('./nosotros/nosotros', {categories})
    },
}

module.exports = mainController; 