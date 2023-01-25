const fs = require('fs');
const path = require('path');  
let db = require('../database/models');

// Defino variable para base Json de Categorías
//const categoryFilePath = path.join(__dirname, '../data/categories.json');
//let categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));
let categorias = db.Categoria.findAll()
let servicios = db.Servicios.findAll()

const mainController = {
    home: (req, res) => {
       categorias
            .then(function(categorias){
                return  res.render('./home/home', {categorias})
            })
        
    },
    contact: (req, res) => {
        categorias
            .then(function(categorias){
        res.render ('./contact/contact', {categorias})
    })
    },
    portfolio: (req, res) => {
        categorias
            .then(function(categorias){
        res.render ('./portfolio/portfolio', {categorias})
    })
    },
    carrito: (req, res) => {
        categorias
            .then(function(categorias){
        res.render('./carrito/carrito', {categorias})
    })
    },
    nosotros: (req, res) => {
        categorias
            .then(function(categorias){
        res.render('./nosotros/nosotros', {categorias, servicios})
    })
    }
}

module.exports = mainController; 