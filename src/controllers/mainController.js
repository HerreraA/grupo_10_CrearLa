const fs = require('fs');
const path = require('path');  
let db = require('../database/models');

// Defino variable para base Json de Categorías
//const categoryFilePath = path.join(__dirname, '../data/categories.json');
//let categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));
let categorias = db.Categoria.findAll()

const mainController = {
    home: (req, res) => {
        res.render('./home/home', {categorias})
    },
    contact: (req, res) => {
        res.render ('./contact/contact', {categorias})
    },
    portfolio: (req, res) => {
        res.render ('./portfolio/portfolio', {categorias})
    },
    carrito: (req, res) => {
        res.render('./carrito/carrito', {categorias})
    },
    nosotros: (req, res) => {
        res.render('./nosotros/nosotros', {categorias})
    },
}

module.exports = mainController; 